import { HttpException, Injectable } from '@nestjs/common';
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
      const user = this.users.findOne({
        where: { email: createUserDto.email },
      });
      if (user) {
        throw new HttpException('이미 존재하는 이메일입니다.', 409);
      }

      const hashPassword = this.hashPassword(createUserDto.password);
      createUserDto.password = hashPassword;

      const result = await this.users.create(createUserDto);
      return await this.users.save(result);
    } catch (e) {
      console.error(e);
    }
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
