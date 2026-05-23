import { NestFactory } from '@nestjs/core';
import { getAppConfig } from './config';
import {
  getAppCommonConfig,
  logBootstrapInfo,
  setupSwagger,
} from '@libs/common';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino/Logger';
import cookieParser from 'cookie-parser';
import { NotificationModule } from './notification.module';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const { appName, httpPort, notificationTcpPort } = getAppConfig();
  const { nodeEnv } = getAppCommonConfig();
  const app = await NestFactory.create(NotificationModule, {
    bufferLogs: true,
  });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: notificationTcpPort,
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  setupSwagger(app, appName, ['/notification-services']);
  await app.startAllMicroservices();
  await app.listen(httpPort);
  logBootstrapInfo(app, {
    nodeEnv,
    httpPort,
  });
}
bootstrap();
