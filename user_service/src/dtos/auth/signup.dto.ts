import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  password: string;
}
