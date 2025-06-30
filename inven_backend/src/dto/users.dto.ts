import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 10)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(10, 30)
  email: string;

  @IsNotEmpty()
  @Length(255)
  password: string;
}
