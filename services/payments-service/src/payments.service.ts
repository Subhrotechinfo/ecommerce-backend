/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/require-await
import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getAppConfig } from './config';
import { NOTIFICATION_SERVICE } from '@libs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(getAppConfig().stripeSecretKey);
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {}
  async createCharge(data: PaymentsCreateChargeDto): Promise<any> {
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
    this.notificationService.emit('notify_email', {
      email: data.email,
      text: `Your payment of $${data.charge.amount} has completed successfully.`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Successful</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f7fa; font-family:Arial, Helvetica, sans-serif;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f7fa; padding:40px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background:#28a745; padding:30px; text-align:center;">
                            <h1 style="margin:0; color:#ffffff; font-size:28px;">
                                Payment Successful
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding:40px 30px;">
                            <p style="margin:0 0 20px; font-size:16px; color:#333333;">
                                Dear Customer,
                            </p>

                            <p style="margin:0 0 20px; font-size:16px; color:#555555; line-height:1.6;">
                                We are pleased to inform you that your payment has been processed successfully.
                            </p>

                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8f9fa; border:1px solid #e9ecef; border-radius:6px; margin:25px 0;">
                                <tr>
                                    <td style="padding:20px;">
                                        <p style="margin:0; font-size:16px; color:#333333;">
                                            <strong>Amount Paid:</strong>
                                            <span style="color:#28a745; font-size:20px;">$${data.charge.amount}</span>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0 0 20px; font-size:16px; color:#555555; line-height:1.6;">
                                Thank you for your payment. If you have any questions regarding this transaction, please contact our support team.
                            </p>

                            <p style="margin:0; font-size:16px; color:#555555;">
                                Best regards,<br>
                                <strong>The Steady Buy</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8f9fa; padding:20px; text-align:center; font-size:13px; color:#888888;">
                            © 2026 The Steady Buy. All rights reserved.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`,
    });

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
