import { UserCreateDto } from '../../auth/dto/user-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IRepository } from '../../common/interfaces/repository.interface';
import { NotFoundException } from '@nestjs/common';

export class TypeORMUserRepository implements IRepository<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}


  async create(user: UserCreateDto): Promise<UserEntity> {
    const userEntity = this.userRepository.create(user);
    console.log(userEntity);
    return this.userRepository.save(userEntity);
  }

  async findOne(id: string) : Promise<UserEntity | null>{
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findByParams(params: Partial<UserEntity>): Promise<UserEntity[] | null> {
    const users = await this.userRepository.find({where: params});
    return users ? users : null;
  }

  async findOneByParams(params: Partial<UserEntity>): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({where: params});
    return user ? user: null;
  }

  async findAll(){
    return this.userRepository.find();
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException(`Cannot remove user with id: ${id}. User not found`);
    }
    await this.userRepository.remove(user);
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException(`Cannot update user with id: ${id}. User not found`);
    }
    Object.assign(user, data);
    return this.userRepository.save(user);
  }
}
