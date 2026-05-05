/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule, LoggerModule } from '@libs/common';
import { UsersModule } from './users/users.module';
import { getAppConfig } from './config';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    LoggerModule.forRoot(getAppConfig().appName),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
