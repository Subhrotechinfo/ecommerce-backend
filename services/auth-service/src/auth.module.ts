/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { getAppConfig } from './config';
import { LoggerModule } from '@libs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
// import { ConfigService } from '@nestjs/config';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as Joi from 'joi';
@Module({
  imports: [
    UsersModule,
    LoggerModule.forRoot(getAppConfig().appName),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     MONGODB_URI: Joi.string().required(),
    //     JWT_SECRET: Joi.string().required(),
    //     JWT_EXPIRES_IN: Joi.string().required(),
    //   }),
    // }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: parseInt(process.env.JWT_EXPIRES_IN) },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule { }
