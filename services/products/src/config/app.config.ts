/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MicroserviceName } from '@libs/core';
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();
export const getAppConfig = () => ({
  appName: process.env.PRODUCT_SERVICE_APP_NAME || 'Product Service',
  appPort: process.env.PRODUCT_SERVICE_APP_PORT || 5002,
  microserviceName: MicroserviceName.ProductService,
});

export const appConfiguration = registerAs('app', getAppConfig);
