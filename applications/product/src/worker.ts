import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JobWorkerConfig } from './config';

export abstract class JobWorker {
  @Inject() protected configService: ConfigService;
  private config: JobWorkerConfig;

  protected constructor(private context: string, private configKey: string) {}

  protected getConfig() {
    if (this.config) return this.config;
    this.config = new JobWorkerConfig(this.configService.get<JobWorkerConfig>(this.configKey as any));
    return this.config;
  }
}
