/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@libs/common';
import { ProductsRepository } from './products.repository';
import {
  ProductDocument,
  ProductSchema,
} from './products/models/product.schema';
import { getAppConfig } from './config';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule } from '@nestjs/config';
// import * as Joi from 'joi';
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ProductDocument.name, schema: ProductSchema },
    ]),
    LoggerModule.forRoot(getAppConfig().appName),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     MONGODB_URI: Joi.string().required(),
    //   }),
    // }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: getAppConfig().authHost,
            port: Number(getAppConfig().authTcpPort),
          },
        }),
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
