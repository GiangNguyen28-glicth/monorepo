import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const options = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);
  app.setGlobalPrefix('api/v1');
  await app.listen(3001);
}
bootstrap();
