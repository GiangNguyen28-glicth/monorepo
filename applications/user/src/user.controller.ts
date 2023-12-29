import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  @Inject() protected configService: ConfigService;
  @Get('test-1')
  test1() {
    console.log(this.configService);
    return 'Test 1';
  }

  @Get('test-2')
  test2() {
    return 'Test 1';
  }
}
