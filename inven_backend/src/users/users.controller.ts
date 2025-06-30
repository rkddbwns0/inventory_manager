import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from 'src/dto/users.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      return res.send(await this.userService.createUser(createUserDto));
    } catch (e) {
      console.error(e);
    }
  }
}
