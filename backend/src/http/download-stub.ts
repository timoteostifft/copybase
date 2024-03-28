import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('/stub')
export class DownloadStubController {
  @Get()
  async handle(@Res({ passthrough: true }) response: Response) {
    const path = join(process.cwd(), '../backend/src/assets/stub.xlsx');

    const file = createReadStream(path);

    response.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="stub.xlsx"',
    });

    return new StreamableFile(file);
  }
}
