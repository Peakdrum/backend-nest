import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(user_id: number): Promise<User> {
    return this.userRepository.findOne({ where: { user_id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newuser = this.userRepository.create(user);
    return this.userRepository.save(newuser);
  }

  async update(user_id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(user_id, user);
    return this.userRepository.findOne({ where: { user_id } });
  }

  async delete(user_id: number): Promise<void> {
    await this.userRepository.delete(user_id);
  }
}