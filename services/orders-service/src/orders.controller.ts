/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './orders/dto/create-orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  //orders from cart comming needs to be made paymensts here
  @Post()
  // @UseGuards(JwtAuthGuard)
  async create(
    @Body() createOrdersDto: CreateOrdersDto /*@CurrentUser() user: UserDto*/,
  ) {
    return this.ordersService.create(createOrdersDto);
  }
  @Get()
  // @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.ordersService.findAll();
  }
}
