/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MicroserviceName } from '@libs/core';
import { registerAs } from '@nestjs/config';

export const getAppConfig = () => ({
  appName: process.env.ORDERS_SERVICE_APP_NAME || 'Orders Service',
  httpPort: process.env.ORDERS_SERVICE_APP_PORT || 5005,
  microserviceName: MicroserviceName.OrdersService,
  ordersTcpPort: process.env.ORDERS_TCP_PORT,
});

export const appConfiguration = registerAs('app', getAppConfig);
