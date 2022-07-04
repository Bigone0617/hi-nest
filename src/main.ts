import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // dto와 request 객체를 비교하여 없으면 에러 메세지
      whitelist: true,
      // dto와 request 객체를 비교하여 dto에 없는 request가 오면 에러 메시지
      forbidNonWhitelisted: true,
      // querystring중에 숫자를 형변환 해줌
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
