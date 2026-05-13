/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(createOrdersDto: CreateOrdersDto, user) {
    try {
      const orderCreated = await this.ordersRepository.create({
        ...createOrdersDto,
        user_id: user._id,
        email: user.email,
      });
      const data = {
        orderDetails: createOrdersDto,
        user: user,
      };
      console.log('*********************', orderCreated);
      this.paymentsService
        .send('create_charge', data)
        .subscribe(async (response) => {
          console.log('Response order payment', response);
        });
    } catch (error) {
      console.log('Response - Order Error*************', error);
    }
  }
  async findAll() {
    return this.ordersRepository.find({});
  }
}
