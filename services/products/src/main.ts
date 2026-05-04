/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { getAppConfig } from './config';
import { setupSwagger } from '@libs/common';
import { ProductsModule } from './products.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
async function bootstrap() {
  const { appName, appPort } = getAppConfig();
  console.log('Hello file changes.........');
  // const { nodeEnv } = getAppCommonConfig();
  // const log = new Logger(appName);

  const app = await NestFactory.create(ProductsModule, { bufferLogs: true });
  console.log('1. Starting the app.........');

  //adding validation to the app
  //allow only whitelisted properties and forbid non-whitelisted properties
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  setupSwagger(app, appName, ['/auth-service']);
  console.log('2. Starting the app.........');
  await app.init();
  await app.listen(appPort);
  console.log('3. Starting the app.........');

  // logBootstrapInfo(app);
}
bootstrap();
