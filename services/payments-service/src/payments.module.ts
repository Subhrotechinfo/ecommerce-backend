/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { LoggerModule } from '@libs/common';
import { getAppConfig } from './config';

@Module({
  imports: [LoggerModule.forRoot(getAppConfig().appName)],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
