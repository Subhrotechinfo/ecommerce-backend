/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/require-await
import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getAppConfig } from './config';
import { NOTIFICATION_SERVICE } from '@libs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(getAppConfig().stripeSecretKey);
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}
  async createCharge(data): Promise<any> {
    const customer = await this.stripe.customers.create({
      name: 'Jenny Rosen', //change this to dynamic
      email: data.email,
    });
    console.log('Customer', customer);

    // const customerSource = await this.stripe.customers.createSource(
    //   customer.id,
    //   {
    //     source: 'tok_visa',
    //   },
    // );
    // console.log('customerSource', customerSource);

    // const token = await this.stripe.tokens.create({
    //   card: {
    //     number: '4242424242424242',
    //     exp_month: '5',
    //     exp_year: '2026',
    //     cvc: '314',
    //   },
    // });
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card: token,
    // });
    // console.log('payment method', paymentMethod);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: data.charge.amount,
      currency: 'usd',
      payment_method: 'pm_card_visa', //'pm_card_in',
      payment_method_types: ['card'],
      customer: customer.id,
      receipt_email: data.email,
      confirm: true,
    });

    console.log('Payments intent-', paymentIntent);
    const paymentIntentConfirm = await this.stripe.paymentIntents.confirm(
      paymentIntent.id,
      {
        payment_method: 'pm_card_visa',
        return_url: 'https://www.example.com', //change this to order complete page
      },
    );
    console.log(
      'paymentIntentConfirm-',
      paymentIntentConfirm,
      '******************************************',
    );
    //send the notification to the user
    this.notificationService.emit('notify_email', { email: data.email });

    return paymentIntent;
  }

  //update the customer data here
  async createCheckoutSession() {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Node.js and Express book',
            },
            unit_amount: 50 * 100,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'JavaScript T-Shirt',
            },
            unit_amount: 20 * 100,
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['US', 'BR'],
      },
      success_url: `https://www.example.com/success`, //update this
      cancel_url: `https://www.example.com/cancel`, //update this
    });
    return session.url;
  }
}
