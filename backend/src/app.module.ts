import { Module } from '@nestjs/common';
import { DownloadTemplateController } from './http/download-template';
import { FetchMetricsController } from './http/fetch-metrics';
import { GenerateMetricsUseCase } from './use-cases/generate-metrics';
import { DownloadStubController } from './http/download-stub';

@Module({
  controllers: [
    DownloadTemplateController,
    FetchMetricsController,
    DownloadStubController,
  ],
  providers: [GenerateMetricsUseCase],
})
export class AppModule {}
