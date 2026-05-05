import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getAppConfig } from './config';
import { TokenPayload } from './interfaces/token-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    // private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    console.log('tokenPayload', tokenPayload);
    // console.log('JWT_EXPIRES_IN', process.env.JWT_EXPIRES_IN);
    console.log(expires.getSeconds());

    expires.setSeconds(85000);
    console.log('Expires-------------------', expires);
    try {
      const token = this.jwtService.sign(tokenPayload, {
        secret: 'NB4HZWKzpfvh7FEXZFmP4l0x0q7yGMhtwFR7VNEF518',
      });
      response.cookie('Authentication', token, {
        httpOnly: true,
        expires,
      });
    } catch (error) {
      console.log('Auth service login error', error);
    }
  }
}
