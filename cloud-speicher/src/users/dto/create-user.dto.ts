import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5, { message: 'Минимально 3 символа' })
  fullName: string;
  @IsString()
  email: string;
  @IsString()
  @MinLength(5, { message: 'Минимально 5 символов' })
  password: string;
}
