import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

/**
 * Main function to bootstrap the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  ); // Enable global validation pipes

  app.enableCors(); // Enable CORS

  const options = new DocumentBuilder()
    .setTitle('Lost and Found API')
    .setDescription('The API for Lost and Found application')
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build(); // Swagger configuration

  const document = SwaggerModule.createDocument(app, options); // Create Swagger document

  SwaggerModule.setup('api', app, document); // Setup Swagger

  await app.listen(3000);
}

bootstrap(); // Bootstrap the application
