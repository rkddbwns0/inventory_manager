import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from 'src/dto/users.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  @Get()
  async dupEmail(@Query('email') email: string, @Res() res: Response) {
    try {
      console.log(email);
      const result = await this.userService.dupEmail(email);
      return result;
    } catch (e) {
      console.error(e);
    }
  }
}
