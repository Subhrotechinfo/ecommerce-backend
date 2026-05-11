/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MicroserviceName } from '@libs/core';
import { registerAs } from '@nestjs/config';

export const getAppConfig = () => ({
  appName: process.env.PRODUCT_SERVICE_APP_NAME || 'Product Service',
  httpPort: process.env.PRODUCT_SERVICE_APP_PORT || 5000,
  microserviceName: MicroserviceName.ProductService,
  authHost: process.env.AUTH_HOST,
  authTcpPort: process.env.AUTH_TCP_PORT,
});

export const appConfiguration = registerAs('app', getAppConfig);
