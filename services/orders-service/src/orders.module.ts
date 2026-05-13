/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DatabaseModule, LoggerModule } from '@libs/common';
import { getAppConfig } from './config';
import { OrdersDocument, OrdersSchema } from './orders/models/orders.schema';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: OrdersDocument.name, schema: OrdersSchema },
    ]),
    LoggerModule.forRoot(getAppConfig().appName),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
