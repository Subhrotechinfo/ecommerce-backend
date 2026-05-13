import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersDto } from './orders/dto/create-orders.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async create(createOrdersDto: CreateOrdersDto) {
    return this.ordersRepository.create({
      ...createOrdersDto,
    });
  }
  async findAll() {
    return this.ordersRepository.find({});
  }
}
