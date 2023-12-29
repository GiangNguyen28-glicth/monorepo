import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { RabbitMQModule } from '@giangnt3246/rabbitmq';
@Module({
  imports: [RabbitMQModule],
  controllers: [UserController],
})
export class UserModule {}
