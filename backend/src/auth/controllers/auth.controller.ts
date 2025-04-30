import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { IUser } from '../../users/interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: UserCreateDto): Promise<any> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const response = await this.authService.login(loginUserDto);
    const token = response.access_token;
    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return token;
  }
}
