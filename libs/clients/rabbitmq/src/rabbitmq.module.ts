import { Global, Module } from '@nestjs/common';
import { ClientCoreModule } from '@giangnt3246/client-core';
import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({
  imports: [ClientCoreModule],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {}
