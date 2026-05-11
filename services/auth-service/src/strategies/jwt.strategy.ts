/* eslint-disable @typescript-eslint/no-unsafe-return */
import { getAppConfig } from '@/config';
import { TokenPayload } from '@/interfaces/token-payload.interface';
import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Implement JWT strategy logic here
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return (
            request?.cookies?.Authentication ||
            request?.Authentication ||
            request?.headers.Authentication
          );
        },
      ]),
      secretOrKey: getAppConfig().JWT_SECRET,
    });
  }
  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({ _id: userId });
  }
}
