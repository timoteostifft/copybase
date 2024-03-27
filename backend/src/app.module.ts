import { Module } from '@nestjs/common';
import { DownloadTemplateController } from './http/download-template';
import { FetchMetricsController } from './http/fetch-metrics';
import { GenerateMetricsUseCase } from './use-cases/generate-metrics';

@Module({
  controllers: [DownloadTemplateController, FetchMetricsController],
  providers: [GenerateMetricsUseCase],
})
export class AppModule {}
