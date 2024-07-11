import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async add({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }): Promise<User> {
    const user = new User();
    user.userName = userName;
    user.password = password;
    user.isActive = true;
    user.creationDate = new Date();

    return this.usersRepository.save(user);
  }

  exists({
    userName,
    password,
  }: {
    userName: string;
    password?: string;
  }): Promise<boolean> {
    let query = this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :userName', { userName });
    if (password) {
      query = query.andWhere('user.password = :password', { password });
    }
    return query.getExists();
  }

  find({
    userName,
    password,
  }: {
    userName: string;
    password?: string;
  }): Promise<User> {
    let query = this.usersRepository
      .createQueryBuilder('user')
      .where('user.username = :userName', { userName });
    if (password) {
      query = query.andWhere('user.password = :password', { password });
    }
    return query.getOne();
  }
}
