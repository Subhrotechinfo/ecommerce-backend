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
  smtpUser: process.env.SMTP_USER,
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
});

export const appConfiguration = registerAs('app', getAppConfig);
