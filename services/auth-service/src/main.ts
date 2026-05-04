/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAppConfig } from './config';
import {
  getAppCommonConfig,
  // getWinstonConfig,
  // logBootstrapInfo,
  setupSwagger,
} from '@libs/common';
import { WinstonModule } from 'nest-winston';
async function bootstrap() {
  const { appName, appPort } = getAppConfig();
  const { nodeEnv } = getAppCommonConfig();
  // const logger = WinstonModule.createLogger(getWinstonConfig(appName, nodeEnv));

  const app = await NestFactory.create(AppModule);
  setupSwagger(app, appName, ['/auth-service']);
  await app.init();
  await app.listen(appPort);
  // logBootstrapInfo(app, {
  //   nodeEnv,
  //   logger,
  //   appPort,
  // });
}
bootstrap();
