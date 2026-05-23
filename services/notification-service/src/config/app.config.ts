/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MicroserviceName } from '@libs/core';
import { registerAs } from '@nestjs/config';

export const getAppConfig = () => ({
  appName: process.env.NOTIFICATION_SERVICE_APP_NAME || 'Notification Service',
  httpPort: process.env.NOTIFICATION_SERVICE_APP_PORT || 5007,
  microserviceName: MicroserviceName.NotificationService,
  notificationTcpPort: process.env.NOTIFICATION_TCP_PORT,
});

export const appConfiguration = registerAs('app', getAppConfig);
