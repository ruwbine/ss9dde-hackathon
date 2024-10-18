import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PasswordService } from './services/password.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import 'dotenv/config'
@Module({
  imports: [
    UsersModule,
    PassportModule.register({defaultStrategy: 'jwt', useClass: JwtStrategy}),
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
    }),

  ],
  providers: [AuthService, PasswordService, TokenService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
