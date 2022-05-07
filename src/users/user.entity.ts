import { Book } from '../books/book.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('text', { array: true, nullable: true })
  userBooks: string[];

  @ManyToMany(() => Book, (book) => book.user)
  books: Book[];
}
