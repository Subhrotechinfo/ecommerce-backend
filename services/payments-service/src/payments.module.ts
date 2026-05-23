/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { LoggerModule, NOTIFICATION_SERVICE } from '@libs/common';
import { getAppConfig } from './config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    LoggerModule.forRoot(getAppConfig().appName),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATION_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: getAppConfig().notificationHost,
            port: Number(getAppConfig().notificationTcpPort),
          },
        }),
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
