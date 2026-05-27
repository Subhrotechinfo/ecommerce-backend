/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersDto } from './orders/dto/create-orders.dto';
import { PAYMENTS_SERVICE, UserDto } from '@libs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';
import { generateSnowflakeId, SnowflakeOptions } from '@grkndev/snowflakeid';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(createOrdersDto: CreateOrdersDto, { email, _id }: UserDto) {
    try {
      const options: SnowflakeOptions = { nodeId: 5, epoch: 1609459200000 };
      const customOrderId = generateSnowflakeId(options);

      const createCharges = {
        ...createOrdersDto,
        userId: _id,
        email: email,
        order_id: customOrderId,
      };

      return this.paymentsService.send('create_charge', createCharges).pipe(
        map((paymentIntent) => {
          console.log('Response order payment', paymentIntent);
          return this.ordersRepository.create({
            ...createOrdersDto,
            order_id: customOrderId,
            payment_transaction_id: paymentIntent.id,
            user_id: _id,
            email: email,
          });
        }),
      );
    } catch (error) {
      console.log('Response - Order Service Error*************', error);
    }
  }
  async findAll() {
    return this.ordersRepository.find({});
  }
}
