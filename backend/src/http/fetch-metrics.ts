import {
  Controller,
  FileTypeValidator,
  ParseFilePipe,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';
import * as csv from 'csv-parser';
import { z } from 'zod';
import { GenerateMetricsUseCase } from 'src/use-cases/generate-metrics';
import { normalizeDate } from 'src/utils/normalize-date';

const spreadsheetValidationSchema = z.object({
  'quantidade cobranças': z.coerce.number(),
  'cobrada a cada X dias': z.coerce.number(),
  'data início': z.string(),
  status: z.string(),
  'data status': z.string(),
  'data cancelamento': z.string(),
  valor: z.string(),
  'próximo ciclo': z.string(),
  'ID assinante': z.string(),
});

type SpreadsheetSchemaType = z.infer<typeof spreadsheetValidationSchema>;

@Controller('/metrics')
export class FetchMetricsController {
  constructor(private generateMetricsUseCase: GenerateMetricsUseCase) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: '.(csv|sheet|spreadsheet)',
          }),
        ],
        errorHttpStatusCode: 422,
      }),
    )
    file: Express.Multer.File,
  ) {
    const stream = Readable.from(file.buffer);

    const spreadsheet: SpreadsheetSchemaType[] = [];

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (data) => {
          try {
            spreadsheetValidationSchema.parse(data);
            spreadsheet.push(data);
          } catch (err) {
            reject(new UnprocessableEntityException());
            stream.destroy();
          }
        })
        .on('end', () => {
          resolve('success');
        });
    });

    const data = spreadsheet.map((e) => ({
      charges: Number(e['quantidade cobranças']),
      interval: e['cobrada a cada X dias'],
      initiated_at: normalizeDate(e['data status']),
      status: e['status'],
      status_at: normalizeDate(e['data status']),
      canceled_at: normalizeDate(e['data cancelamento']),
      price: parseFloat(e['valor'].replace(',', '.')),
      next_cycle: normalizeDate(e['próximo ciclo']),
      subscriber_id: e['ID assinante'],
    }));

    const { metrics } = await this.generateMetricsUseCase.execute({ data });

    return {
      metrics,
    };
  }
}
