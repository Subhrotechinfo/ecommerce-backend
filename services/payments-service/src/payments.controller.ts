/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe())
  createCharge(@Payload() data) {
    // console.log('catched the data here', data);
    const payment = this.paymentsService.createCharge(data);
    console.log('Payments log', payment);
    return payment;
  }
  // @MessagePattern('create_checkout_session')
  // createCheckoutSession() {
  //   //need to send customer data here.
  //   return this.paymentsService.createCheckoutSession();
  // }
}
