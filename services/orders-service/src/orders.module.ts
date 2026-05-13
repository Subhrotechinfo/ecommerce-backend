/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import {
  AUTH_SERVICE,
  DatabaseModule,
  LoggerModule,
  PAYMENTS_SERVICE,
} from '@libs/common';
import { getAppConfig } from './config';
import { OrdersDocument, OrdersSchema } from './orders/models/orders.schema';
import { OrdersRepository } from './orders.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: OrdersDocument.name, schema: OrdersSchema },
    ]),
    LoggerModule.forRoot(getAppConfig().appName),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: getAppConfig().authHost,
            port: Number(getAppConfig().authTcpPort),
          },
        }),
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: getAppConfig().paymentsHost,
            port: Number(getAppConfig().paymentsTcpPort),
          },
        }),
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
