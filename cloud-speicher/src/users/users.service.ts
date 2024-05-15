import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async create(dto: CreateUserDto) {
    const existUser = this.findByEmail(dto.email);
    if (existUser)
      return new BadRequestException({
        message: 'Данный емайл уже подвязан к другому аккаунту',
      });
    return this.repository.save(dto);
  }
}
