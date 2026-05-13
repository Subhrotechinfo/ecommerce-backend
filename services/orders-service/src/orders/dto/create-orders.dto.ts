import {
  IsDefined,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateChargeDto } from '@libs/common';
import { Type } from 'class-transformer';

export class CreateOrdersDto {
  @IsString()
  order_id: string;

  user_id: string;

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

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
