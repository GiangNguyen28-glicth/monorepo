import { RabbitMQModule } from '@giangnt3246/rabbitmq';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
@Module({
  imports: [RabbitMQModule],
  controllers: [ProductController],
})
export class ProductModule {}
