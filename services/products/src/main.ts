/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { getAppConfig } from './config';
import { getAppCommonConfig, setupSwagger } from '@libs/common';
import { WinstonModule } from 'nest-winston';
import { ProductsModule } from './products.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger, PinoLogger } from 'nestjs-pino';
async function bootstrap() {
  const { appName, appPort } = getAppConfig();
  const { nodeEnv } = getAppCommonConfig();
  // const log = new Logger(appName);

  const app = await NestFactory.create(ProductsModule, { bufferLogs: true });
  //adding validation to the app
  //allow only whitelisted properties and forbid non-whitelisted properties
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  setupSwagger(app, appName, ['/auth-service']);
  await app.init();
  await app.listen(appPort);
  // logBootstrapInfo(app);
}
bootstrap();
