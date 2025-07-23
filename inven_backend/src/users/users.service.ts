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
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!regex.test(email)) {
      throw new HttpException('이메일 형식을 맞춰주세요.', HttpStatus.CONFLICT);
    }

    const user = await this.users.findOne({
      where: { email: email },
    });
    if (user) {
      throw new HttpException(
        '이미 존재하는 이메일입니다.',
        HttpStatus.CONFLICT,
      );
    }

    return { available: true };
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
