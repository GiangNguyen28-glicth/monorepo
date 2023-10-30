import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('test-1')
  test1() {
    return 'Test 1';
  }

  @Get('test-2')
  test2() {
    return 'Test 1';
  }
}
