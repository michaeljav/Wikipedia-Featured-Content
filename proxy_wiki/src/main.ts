import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  //so you can validate with validation decorators on the DTO in all controllers methods used.
  //so you can use decorator @transform
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Proxy Wiki')
    .setDescription('Proxy to the Wikipedia Featured Content API.')
    .setVersion('1.0')
    .addTag('feed')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.listen(3000);
}
bootstrap();
