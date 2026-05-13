import { IsString } from 'class-validator';

export class CreateOrdersDto {
  @IsString()
  order_id: string;

  @IsString()
  user_id: string;

  @IsString()
  email: string;

  @IsString()
  shipping_address: string;

  @IsString()
  items: string;

  @IsString()
  shipping_cost: string;

  @IsString()
  shipping_tracking_id: string;

  @IsString()
  payment_transaction_id: string;

  @IsString()
  status: string;

  createdAt: Date;
}
