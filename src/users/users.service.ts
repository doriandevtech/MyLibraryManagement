import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.getUsers();
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

  async updateUser(id: string, updatedUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.getUserById(id);

    const { username, password } = updatedUserDto;

    updatedUser.username = username;
    updatedUser.password = password;
    await this.usersRepository.save(updatedUser);

    return updatedUser;
  }

  async deleteUserById(id: string) {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }
}
