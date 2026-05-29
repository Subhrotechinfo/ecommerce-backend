/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { getAppConfig } from './config';
import {
  getAppCommonConfig,
  logBootstrapInfo,
  setupSwagger,
} from '@libs/common';
import { ProductsModule } from './products.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const { appName, httpPort } = getAppConfig();
  const { nodeEnv } = getAppCommonConfig();
  const app = await NestFactory.create(ProductsModule, { bufferLogs: true });
  app.use(cookieParser());

  //adding validation to the app
  //allow only whitelisted properties and forbid non-whitelisted propertiesss
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  setupSwagger(app, appName, ['/products-service']);
  await app.init();
  await app.listen(httpPort);
  try {
    logBootstrapInfo(app, {
      nodeEnv,
      httpPort,
    });
  } catch (error) {
    console.log('Product error bootstrap', error);
  }
}
bootstrap();
