import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getAppConfig } from './config';
@Injectable()
export class AuthService {
  constructor(
    // private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }
  async login(user: UserDocument, response: Response) {
    const tokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    console.log('tokenPayload', tokenPayload);
    // console.log('JWT_EXPIRES_IN', process.env.JWT_EXPIRES_IN);
    console.log(expires.getSeconds());

    expires.setSeconds(85000);
    const token = this.jwtService.sign({ userId: tokenPayload.userId });
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
