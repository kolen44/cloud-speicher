import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors({ credentials: true, origin: true });
  const configApi = new DocumentBuilder()
    .setTitle('Облачное хранилище данных')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configApi);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(7777);
}
bootstrap();
