import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


















/* 익숙해지려고 따라쳐봄
async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
*/