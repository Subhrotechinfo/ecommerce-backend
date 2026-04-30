import { AbstractDocument } from '@libs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class ProductDocument extends AbstractDocument {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  imageURL: string;
  @Prop()
  catagories: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
