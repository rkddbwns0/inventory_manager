import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from 'src/dto/users.dto';
import { Response } from 'express';
import { HttpExceptionFilter } from 'src/customException/http-exception.filter';

@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post()
  @UseFilters(HttpExceptionFilter)
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  async dupEmail(@Query('email') email: string) {
    const result = await this.userService.dupEmail(email);
    return result;
  }
}
