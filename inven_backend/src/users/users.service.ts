import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/users.dto';
import { UsersEntity } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      console.log(createUserDto);
      const user = await this.users.findOne({
        where: { email: createUserDto.email },
      });

      if (user) {
        throw new HttpException(
          '이미 존재하는 이메일입니다.',
          HttpStatus.CONFLICT,
        );
      }

      const hashPassword = this.hashPassword(createUserDto.password);

      const result = await this.users.create({
        ...createUserDto,
        password: hashPassword,
      });
      return await this.users.save(result);
    } catch (e) {
      console.error(e);
    }
  }

  async dupEmail(email: string) {
    try {
      const user = await this.users.findOne({
        where: { email: email },
      });

      if (user) {
        throw new HttpException(
          '이미 존재하는 이메일입니다.',
          HttpStatus.CONFLICT,
        );
      }

      return { message: '사용 가능한 이메일입니다.', available: true };
    } catch (e) {
      console.error(e);
    }
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
