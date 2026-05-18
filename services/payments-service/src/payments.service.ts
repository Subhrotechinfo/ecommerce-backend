/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getAppConfig } from './config';
// import { CreateChargeDto } from '@libs/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(getAppConfig().stripeSecretKey);

  // eslint-disable-next-line @typescript-eslint/require-await
  async createCharge(data): Promise<any> {
    const customer = await this.stripe.customers.create({
      name: 'Jenny Rosen', //change this to dynamic
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

    // const cardToken = {
    //   id: 'card_1MvoiELkdIwHu7ixOeFGbN9D',
    //   object: 'card',
    //   address_city: null,
    //   address_country: null,
    //   address_line1: null,
    //   address_line1_check: null,
    //   address_line2: null,
    //   address_state: null,
    //   address_zip: null,
    //   address_zip_check: null,
    //   brand: 'Visa',
    //   country: 'US',
    //   customer: 'cus_NhD8HD2bY8dP3V',
    //   cvc_check: null,
    //   dynamic_last4: null,
    //   exp_month: 4,
    //   exp_year: 2024,
    //   fingerprint: 'mToisGZ01V71BCos',
    //   funding: 'credit',
    //   last4: '4242',
    //   metadata: {},
    //   name: null,
    //   tokenization_method: null,
    //   wallet: null,
    // };
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card: cardToken,
    // });
    // console.log('payment method', paymentMethod);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 500,
      currency: 'gbp',
      payment_method: 'pm_card_in',
      payment_method_types: ['card'],
      customer: customer.id,
      receipt_email: data.user.email,
    });

    console.log('Payments intent-', paymentIntent);
    return paymentIntent;
  }
}
