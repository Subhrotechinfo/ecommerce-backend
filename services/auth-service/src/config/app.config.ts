/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MicroserviceName } from '@libs/core';
import { registerAs } from '@nestjs/config';

// dotenv.config();
export const getAppConfig = () => ({
  appName: process.env.AUTH_SERVICE_APP_NAME,
  httpPort: process.env.AUTH_SERVICE_APP_PORT,
  tcpPort: process.env.AUTH_SERVICE_TCP_PORT,
  microserviceName: MicroserviceName.AuthService,
  JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN) || 36000,
  JWT_SECRET: process.env.JWT_SECRET,
});

// export const getEnv = () => ({
//   JWT_EXPIRES_IN: Number(process.env.JWT_EXPIRES_IN) || 36000,
//   JWT_SECRET: process.env.JWT_SECRET,
// });

export const appConfiguration = registerAs('app', getAppConfig);
