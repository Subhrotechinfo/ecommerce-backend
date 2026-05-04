/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule, LoggerModule } from '@libs/common';
import { ProductsRepository } from './products.repository';
import {
  ProductDocument,
  ProductSchema,
} from './products/models/product.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ProductDocument.name, schema: ProductSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
