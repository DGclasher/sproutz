import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const allowedOrigins = [
  'http://localhost:5173',
  'https://the-wildflowers.vercel.app',
];
async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}
bootstrap();
