import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { contentParser } from 'fastify-multer';
// import helmet from 'fastify-helmet';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  // await app.register(helmet, {
  //   contentSecurityPolicy: {
  //     directives: {
  //       defaultSrc: [`'self'`],
  //       styleSrc: [`'self'`, `'unsafe-inline'`],
  //       imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
  //       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
  //     },
  //   },
  // });
  await app.register(contentParser);
  app.useStaticAssets({ root: join(__dirname, '../../fastify-file-upload') });

  // Then combine it with your microservice
  app.connectMicroservice({
    transport: Transport.TCP,
    // options: { host: '0.0.0.0', port: 5000 },
  });

  await app.startAllMicroservices();

  await app.listen(3000, '0.0.0.0');
}
bootstrap().then(() => console.log('http://0.0.0.0:3000/docs'));
