import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: 'GET,POST',
  });
  await app.listen(port, () => {
    console.log(`Server running on ${port}`);
  });
}
bootstrap();
