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

import { PaymentsModule } from './payments.module';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const { appName, httpPort, paymentsTcpPort } = getAppConfig();
  const { nodeEnv } = getAppCommonConfig();
  const app = await NestFactory.create(PaymentsModule, { bufferLogs: true });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: paymentsTcpPort,
    }
  })
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  setupSwagger(app, appName, ['/payments-services']);
  await app.startAllMicroservices();
  logBootstrapInfo(app, {
    nodeEnv,
    httpPort,
  });
}
bootstrap();
