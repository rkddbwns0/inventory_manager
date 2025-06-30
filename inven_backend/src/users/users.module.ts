import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  exports: [],
  controllers: [],
})
export class UsersModule {}
