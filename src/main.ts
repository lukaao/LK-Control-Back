import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const logger = new Logger('Freela:');
  const config = new DocumentBuilder()
    .setTitle('Freela')
    .setDescription('Freela Doc')
    .setVersion('1.0')
    .addTag('Freela')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT, () => {
    logger.verbose(`[BACK-END] EM [ http://localhost:${process.env.PORT} ]`);
    logger.verbose(
      `[DOCUMENTAÇAO] -> [ http://localhost:${process.env.PORT}/api ]`,
    );
  });
}
bootstrap();
