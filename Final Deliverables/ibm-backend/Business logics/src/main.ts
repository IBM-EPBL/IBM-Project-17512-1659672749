import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { json } from 'express';
import * as redis from 'ioredis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://fijo.vercel.app',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());
  app.use(json({ limit: '3mb' }));
  const R = new redis(
    'redis://:b4722ca688d24027a33b0f649208bc8d@eu1-aware-tuna-35243.upstash.io:35243',
  );
  global.Publisher = R;
  global.Subscriber = R.duplicate();
  global.Subscriber.subscribe('get-parsed-data');
  await app.listen(process.env.PORT || 8000);
}
bootstrap();
