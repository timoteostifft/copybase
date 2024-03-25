import { Module } from '@nestjs/common';
import { DownloadTemplateController } from './http/download-template';

@Module({
  controllers: [DownloadTemplateController],
})
export class AppModule {}
