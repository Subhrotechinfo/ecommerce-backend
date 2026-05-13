/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersDto } from './orders/dto/create-orders.dto';
import { PAYMENTS_SERVICE } from '@libs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(PAYMENTS_SERVICE) paymentsService: ClientProxy,
  ) {}
  async create(createOrdersDto: CreateOrdersDto, user) {
    return this.ordersRepository.create({
      ...createOrdersDto,
      user_id: user._id,
      email: user.email,
    });
  }
  async findAll() {
    return this.ordersRepository.find({});
  }
}
