import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { LoggerModule } from '@libs/common';
import { getAppConfig } from './config';

@Module({
  imports: [LoggerModule.forRoot(getAppConfig().appName)],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
