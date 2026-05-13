/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getAppConfig } from './config';
import { CreateChargeDto } from '@libs/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(getAppConfig().stripeSecretKey);

  async createCharge({ card, amount }: CreateChargeDto): Promise<any> {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    return paymentIntent;
  }
}
