import { Module } from '@nestjs/common';
import { RabbitModule } from '@monorepo/rabbitmq';
import { ProductController } from './product.controller';
@Module({
  imports: [RabbitModule],
  controllers: [ProductController],
})
export class ProductModule {}
