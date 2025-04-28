import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
      private readonly usersService: UsersService,
      private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') !
    });
  }



  async validate(payload: any) {
    const user = await this.usersService.findById(payload.userId);
    if (!user) {
      throw new UnauthorizedException('Invalid token or user not found');
    }

    return user;
  }
}
