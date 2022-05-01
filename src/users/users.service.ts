import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  getUsers(user: User): Promise<User[]> {
    return this.usersRepository.getUsers(user);
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.usersRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  createUser(user: User): Promise<User> {
    return this.usersRepository.createUser(user);
  }

  // async updateUser(id: string): Promise<User> {
  //   const updatedUser = await this.getUserById(id);

  //   updatedUser.username = user.username;
  //   updatedUser.password = user.password;
  //   await this.usersRepository.save(user);

  //   return user;
  // }

  async deleteUserById(id: string) {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
