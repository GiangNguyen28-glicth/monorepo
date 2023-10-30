import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get('test-1')
  test1() {
    return 'Test 1';
  }

  @Get('test-2')
  test2() {
    return 'Test 1';
  }
}
