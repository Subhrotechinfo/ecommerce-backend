/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AbstractDocument } from '@libs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class OrdersDocument extends AbstractDocument {
  @Prop()
  order_id: string; //UUID, returned to customer
  @Prop()
  user_id: string; //References users.user_id
  @Prop()
  email: string; //Snapshot of user email at checkout
  @Prop()
  shipping_address: string; //Embedded: { street, city, state, country, zip_code }
  @Prop()
  items: string; //Snapshot: [{ product_id, name, quantity, cost }]
  @Prop()
  shipping_cost: string; //Quoted shipping cost
  @Prop()
  shipping_tracking_id: string; //From Shipping service
  @Prop()
  payment_transaction_id: string; //References payments.transaction_id
  @Prop()
  status: string; //pending | paid | shipped | cancelled
  @Prop()
  createdAt: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(OrdersDocument);
