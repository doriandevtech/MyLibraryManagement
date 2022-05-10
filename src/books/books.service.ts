import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  private logger = new Logger('BookService');

  async getBooks(): Promise<Book[]> {
    try {
      return await this.booksRepository.find();
    } catch (err) {
      this.logger.error(`Failed to get users`);
      throw new InternalServerErrorException();
    }
  }

  async getBookById(id: string): Promise<Book> {
    const found = await this.booksRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async editBookById(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.getBookById(id);

    const { title, description } = updateBookDto;

    updatedBook.title = title;
    updatedBook.description = description;
    await this.booksRepository.update(
      { id },
      { title: title, description: description },
    );

    return updatedBook;
  }

  async deleteBookById(id: string): Promise<void> {
    const result = await this.booksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `The task with the ID ${id} has not been found`,
      );
    }
  }
}
