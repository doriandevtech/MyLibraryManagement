import { IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  numberOfCopies: number;
}
