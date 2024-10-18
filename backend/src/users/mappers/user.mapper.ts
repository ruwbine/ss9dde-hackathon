import { UserEntity } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';

export class UserMapper {
  static toIUserPublic(userEntity: UserEntity | IUser): IUser {
    return {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      isEmailConfirmed: userEntity.isEmailConfirmed,
      lastLogin: userEntity.lastLogin,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }


  static toIUserInternal(userEntity: UserEntity): IUser {
    return {
      id: userEntity.id,
      username: userEntity.username,
      email: userEntity.email,
      password: userEntity.password,
      isEmailConfirmed: userEntity.isEmailConfirmed,
      lastLogin: userEntity.lastLogin,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
