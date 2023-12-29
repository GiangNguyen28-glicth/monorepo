import { Global, Module } from '@nestjs/common';
import { CommonModule } from '@giangnt3246/common';
@Global()
@Module({
  imports: [CommonModule],
})
export class ClientCoreModule {}
