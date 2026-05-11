import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getAppConfig } from './config';
@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    getAppConfig().stripeSecretKey,
  );
  getHello(): string {
    return 'Hello World!';
  }
}
