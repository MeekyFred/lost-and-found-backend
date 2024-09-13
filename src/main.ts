import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';

import { AppModule } from './app.module';

/**
 * Main function to bootstrap the application
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Create the application

  // Apply the ClassSerializerInterceptor globally
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  ); // Enable global validation pipes

  const options = new DocumentBuilder()
    .setTitle('Lost and Found API')
    .setDescription('The API for Lost and Found application')
    .setVersion('1.0')
    .addBearerAuth()
    .build(); // Swagger configuration

  const document = SwaggerModule.createDocument(app, options); // Create Swagger document

  SwaggerModule.setup('api', app, document); // Setup Swagger

  const configService = app.get(ConfigService); // Get the configuration service

  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  }); // Update AWS configuration

  app.enableCors(); // Enable CORS

  app.enableCors({
    origin: [
      'http://localhost:3030',
      'https://lost-and-found-team.vercel.app',
      'http://ec2-54-247-235-250.eu-west-1.compute.amazonaws.com',
      'https://lost-and-found-backend-0sdp.onrender.com',
    ],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(configService.get('appConfig.port')); // Start the application
}

bootstrap(); // Bootstrap the application
