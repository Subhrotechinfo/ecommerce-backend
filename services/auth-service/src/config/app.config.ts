/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MicroserviceName } from '@libs/core';
import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
// import { MicroserviceName } from '@libs/core';

dotenv.config();
export const getAppConfig = () => ({
  appName: process.env.AUTH_SERVICE_APP_NAME || 'Auth Service',
  appPort: process.env.AUTH_SERVICE_APP_PORT || 5001,
  microserviceName: MicroserviceName.AuthService,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '3600',
});

export const appConfiguration = registerAs('app', getAppConfig);
