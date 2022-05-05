import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private logger = new Logger('UserService');

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const user = this.usersRepository.create({
      username,
      password,
    });

    await this.usersRepository.save(user);
    return user;
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (err) {
      this.logger.error(`Failed to get users`);
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: string): Promise<User> {
    const found = await this.usersRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
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
