import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'https://the-wildflowers.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  await app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}
bootstrap();
