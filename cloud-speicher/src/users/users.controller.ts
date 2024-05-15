import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@userId() id: number) {
    return this.usersService.findById(id);
  }
}
