import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.signup(createUserDto);
  }

  @Post('/signin')
  signin(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signin(createUserDto);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('/me')
  getMe(user: User): Promise<User> {
    return this.usersService.getUserById(user.id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatedUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(id, updatedUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteUserById(id);
  }
}
