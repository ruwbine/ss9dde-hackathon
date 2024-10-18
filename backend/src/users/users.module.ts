import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { TypeORMUserRepository } from './repository/typeorm.user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UsersService, TypeORMUserRepository],
  exports: [UsersService],
})
export class UsersModule {}
