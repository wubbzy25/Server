import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as multer from 'multer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.enableCors();
  app.use(
    multer({
      limits: {
        fileSize: 100 * 1024 * 1024, // 40 MB
      },
    }).any(),
  );
  await app.listen(Number(port));
}
bootstrap();
