import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurer le middleware CORS
  app.use(
    cors({
      origin: '*', // Remplacez par le domaine autorisé
      methods: 'GET,POST,PUT,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    }),
  );

  await app.listen(3000);
}
bootstrap();
