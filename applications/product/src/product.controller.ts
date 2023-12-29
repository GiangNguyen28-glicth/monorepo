import { Controller, Get } from '@nestjs/common';
import { JobWorker } from './worker';
import { JobWorkerConfig } from './config';
export const CONFIG_KEY = 'aiBrandRetraining';
@Controller('product')
export class ProductController extends JobWorker {
  constructor() {
    super(ProductController.name, CONFIG_KEY);
  }

  private get jobConfig(): JobWorkerConfig {
    return new JobWorkerConfig(this.configService.get(CONFIG_KEY as any));
  }

  @Get('test-1')
  test1() {
    console.log(this.getConfig());
    return 'Test 1';
  }
}
