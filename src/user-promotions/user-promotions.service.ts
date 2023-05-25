import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPromotion } from './user-promotion.entity';

@Injectable()
export class UserPromotionsService {
  constructor(
    @InjectRepository(UserPromotion)
    private userPromotionRepository: Repository<UserPromotion>,
  ) {}

  async findAll(): Promise<UserPromotion[]> {
    return this.userPromotionRepository.find();
  }

  async findOne(user_promotion_id: number): Promise<UserPromotion> {
    return this.userPromotionRepository.findOne({ where: { user_promotion_id } });
  }

  async create(data: Partial<any>): Promise<any> {
    const user_id = data.user_id
    const promotion_id = data.promotion_id
    const hourPlay = data.hours
    const userExist = false
    //vaidate user
    //validate promotino
    //create userPromotion
    //check hours not zero
    // const newuser = this.userRepository.create(user);
    // return this.userRepository.save(newuser);
    return data
  }

  async update(user_promotion_id: number, userPromotion: Partial<UserPromotion>): Promise<UserPromotion> {
    await this.userPromotionRepository.update(user_promotion_id, userPromotion);
    return this.userPromotionRepository.findOne({ where: { user_promotion_id } });
  }

  async delete(user_promotion_id: number): Promise<void> {
    await this.userPromotionRepository.delete(user_promotion_id);
  }
}