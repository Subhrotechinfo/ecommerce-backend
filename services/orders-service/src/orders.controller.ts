/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './orders/dto/create-orders.dto';
import { CurrentUser, JwtAuthGuard, UserDto } from '@libs/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  //orders from cart comming needs to be made paymensts here
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createOrdersDto: CreateOrdersDto,
    @CurrentUser() user: UserDto,
  ) {
    console.log('Users Info - ', user);
    return this.ordersService.create(createOrdersDto, user);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.ordersService.findAll();
  }
}
