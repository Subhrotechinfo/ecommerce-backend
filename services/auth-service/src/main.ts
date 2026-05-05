import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getAppConfig } from './config';
import {
  getAppCommonConfig,
  // getWinstonConfig,
  // logBootstrapInfo,
  setupSwagger,
} from '@libs/common';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino/Logger';
async function bootstrap() {
  const { appName, appPort } = getAppConfig();
  const { nodeEnv } = getAppCommonConfig();
  // const logger = WinstonModule.createLogger(getWinstonConfig(appName, nodeEnv));

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
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
