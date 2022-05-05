import { IsNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  numberOfCopies: number;
}
