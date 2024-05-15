import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return new UnauthorizedException('Данного пользователя не существует');
  }

  async register(dto: CreateUserDto) {
    try {
      await this.userService.create(dto);
      return { token: this.jwtService.sign({ email: dto.email }) };
    } catch (error) {
      console.log(error);
      return new ForbiddenException(error);
    }
  }

  async login(user: UserEntity) {
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
