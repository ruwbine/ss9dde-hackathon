import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from '../dto/user-create.dto';
import { IUser } from '../../users/interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user-login.dto';
import { IResponse } from '../interfaces/response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: UserCreateDto): Promise<IResponse> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: UserLoginDto): Promise<IResponse> {
    return this.authService.login(loginUserDto);
  }
}
