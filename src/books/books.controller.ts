import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { BooksService } from './books.service';
import { UpdateUserDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.booksService.getUsers();
  }

  @Get('/me')
  getMe(user: User): Promise<User> {
    return this.booksService.getUserById(user.id);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.booksService.getUserById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updatedUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.booksService.updateUser(id, updatedUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteUserById(id);
  }
}
