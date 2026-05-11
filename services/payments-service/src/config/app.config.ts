/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MicroserviceName } from '@libs/core';
import { registerAs } from '@nestjs/config';

export const getAppConfig = () => ({
  appName: process.env.PAYMENTS_SERVICE_APP_NAME || 'Payments Service',
  httpPort: process.env.PAYMENTS_SERVICE_APP_PORT || 5003,
  microserviceName: MicroserviceName.PaymentsService,
  authHost: process.env.AUTH_HOST,
  authTcpPort: process.env.AUTH_TCP_PORT,
});

export const appConfiguration = registerAs('app', getAppConfig);
