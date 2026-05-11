import { NestFactory } from '@nestjs/core';
import { getAppConfig } from './config';
import {
  getAppCommonConfig,
  logBootstrapInfo,
  setupSwagger,
} from '@libs/common';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino/Logger';
import { AuthModule } from './auth.module';
import cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
async function bootstrap() {
  const { appName, httpPort, tcpPort } = getAppConfig();
  const { nodeEnv } = getAppCommonConfig();
  const app = await NestFactory.create(AuthModule, { bufferLogs: true });
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 5002,
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  setupSwagger(app, appName, ['/auth-services']);
  // await app.init();
  await app.startAllMicroservices();
  await app.listen(httpPort);
  logBootstrapInfo(app, {
    nodeEnv,
    httpPort,
  });
}
bootstrap();
