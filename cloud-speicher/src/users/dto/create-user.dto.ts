import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5, { message: 'Минимально 3 символа в имени пользователя нужно' })
  @ApiProperty({ default: 'Никита Сергеевич' })
  fullName: string;
  @IsString()
  @MinLength(5, { message: 'Минимально 5 символов для почты нужно' })
  @ApiProperty({ default: 'test@gmail.com' })
  email: string;
  @IsString()
  @MinLength(5, { message: 'Минимально 5 символов в пароле нужно' })
  @ApiProperty({ default: 'qwerty1234' })
  password: string;
}
