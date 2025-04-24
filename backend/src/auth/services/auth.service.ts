import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from '../../users/interfaces/user.interface';
import { PasswordService } from './password.service';
import { TypeORMUserRepository } from '../../users/repository/typeorm.user.repository';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserCreateDto } from '../dto/user-create.dto';
import { UsersService } from '../../users/users.service';
import { TokenService } from './token.service';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async login(userLoginDto: UserLoginDto): Promise<any> {
    const { email, password } = userLoginDto;
    const user = await this.userService.findByEmail(email, true);

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.passwordService.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.tokenService.generateToken({
      userId: user.id,
      email: user.email,
    });
    return {
      success: true,
      data: [{ access_token: token }],
    };
  }

  async register(createUserDto: UserCreateDto): Promise<IResponse> {
    const existingUser = await this.userService.isExistByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password,
    );
    const createdUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });
    if (!createdUser) {
      return {
        success: false,
        error: new Error('Something went wrong while registration'),
      };
    }

    const token = this.tokenService.generateToken({
      userId: createdUser.id,
      email: createdUser.email,
    });

    return {
      success: !!createdUser,
      data: [
        { responseMessage: 'Registered successfully', access_token: token },
      ],
      error: createdUser ? undefined : new Error('Registration failed'),
    };
  }
}
