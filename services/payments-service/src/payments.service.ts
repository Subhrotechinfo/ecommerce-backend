/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getAppConfig } from './config';
import { CreateChargeDto } from '@libs/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(getAppConfig().stripeSecretKey);

  // eslint-disable-next-line @typescript-eslint/require-await
  async createCharge(data): Promise<any> {
    const customer = await this.stripe.customers.create({
      name: 'Jenny Rosen',
      email: data.user.email,
    });
    console.log('Customer', customer);
    const customerSource = await this.stripe.customers.createSource(
      customer.id,
      {
        source: 'tok_visa',
      },
    );
    console.log('customerSource', customerSource);
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: customerSource
    });
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: data.charge.amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    });
    console.log('Payments intent-', paymentIntent);
    // return paymentIntent;
  }
}
