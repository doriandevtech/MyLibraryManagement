import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  private logger = new Logger('UsersRepository');

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.find();
      return users;
    } catch (err) {
      this.logger.error(`Failed to get users`);
      throw new InternalServerErrorException();
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const user = this.create({
      username,
      password,
    });

    await this.save(user);
    return user;
  }
}
