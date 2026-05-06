import { NestFactory } from '@nestjs/core';
import { getAppConfig } from './config';
import { setupSwagger } from '@libs/common';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino/Logger';
import { AuthModule } from './auth.module';
async function bootstrap() {
  const { appName, appPort } = getAppConfig();
  // const { nodeEnv } = getAppCommonConfig();
  // const logger = WinstonModule.createLogger(getWinstonConfig(appName, nodeEnv));
  const app = await NestFactory.create(AuthModule, { bufferLogs: true });
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
