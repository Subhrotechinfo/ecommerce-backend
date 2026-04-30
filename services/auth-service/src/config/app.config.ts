/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
// import { MicroserviceName } from '@libs/core';

dotenv.config();
export const getAppConfig = () => ({
  appName: process.env.AUTH_SERVICE_APP_NAME || 'Auth Service',
  appPort: process.env.AUTH_SERVICE_APP_PORT || 3000,
  microserviceName: `AuthService`,
});

export const appConfiguration = registerAs('app', getAppConfig);
