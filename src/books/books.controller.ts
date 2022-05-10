import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getBook(): Promise<Book[]> {
    return this.booksService.getBooks();
  }

  @Get('/me')
  getMe(user: User): Promise<Book> {
    return this.booksService.getBookById(user.id);
  }

  @Get(':id')
  getBookById(@Param('id') id: string): Promise<Book> {
    return this.booksService.getBookById(id);
  }

  @Patch(':id')
  editBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.editBookById(id, updateBookDto);
  }

  @Delete(':id')
  deleteBookById(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBookById(id);
  }
}
