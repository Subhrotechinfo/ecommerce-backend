/* eslint-disable @typescript-eslint/no-unsafe-call */
import { AbstractRepository } from '@libs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrdersDocument } from './orders/models/orders.schema';

@Injectable()
export class OrdersRepository extends AbstractRepository<OrdersDocument> {
  protected readonly logger = new Logger(OrdersRepository.name);
  constructor(
    @InjectModel(OrdersDocument.name) orderModel: Model<OrdersDocument>,
  ) {
    super(orderModel);
  }
}
