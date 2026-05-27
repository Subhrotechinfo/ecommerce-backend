import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { getAppConfig } from './config';

@Injectable()
export class NotificationService {
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: getAppConfig().smtpUser,
      clientId: getAppConfig().clientId,
      clientSecret: getAppConfig().clientSecret,
      refreshToken: getAppConfig().refreshToken,
    },
  });
  // steadybuy.app@gmail.com
  async notifyEmail({ email, text }: NotifyEmailDto) {
    console.log('user', getAppConfig().smtpUser);
    console.log('clientId', getAppConfig().clientId);
    console.log('clientSecret', getAppConfig().clientSecret);
    console.log('refreshToken', getAppConfig().refreshToken);
    console.log(email);
    try {
      await this.transporter.sendMail({
        from: getAppConfig().smtpUser,
        to: email,
        subject: 'Ecommerce Notification',
        text: text,
      });
    } catch (error) {
      console.log('Error - **************', error);
    }
  }
}
