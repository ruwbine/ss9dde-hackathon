import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/decorators/user.decorator';
import { IUser } from '../users/interfaces/user.interface';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {


  @Get('')
  getProfile(@User() user: IUser){
    return {
      message: 'User profile informations:',
      'User': user
    }
  }
}
