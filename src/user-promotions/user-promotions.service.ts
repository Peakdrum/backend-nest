import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPromotion } from './user-promotion.entity';
import { User } from 'src/users/user.entity';
import { Promotion } from 'src/promotions/promotion.entity';
import { PromotionUsage } from 'src/promotion-usages/promotion-usage.entity';
import dayjs from 'dayjs';

@Injectable()
export class UserPromotionsService {
  constructor(
    @InjectRepository(UserPromotion)
    private userPromotionRepository: Repository<UserPromotion>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionUsage)
    private promotionUsageRepository: Repository<PromotionUsage>
  ) {}

  async findAll(): Promise<UserPromotion[]> {
    return this.userPromotionRepository.find();
  }

  async findOne(user_promotion_id: number): Promise<UserPromotion> {
    return this.userPromotionRepository.findOne({ where: { user_promotion_id } });
  }

  async create(data: Partial<any>): Promise<any> {
    const hourPlay:number = data.hours
    var user_id:number = data.user_id
    var user:User = await this.userRepository.findOne({where:{user_id}})
    var promotion:Promotion = await this.promotionRepository.findOne({where:{promotion_id:data.promotion_id}})

    if(!!user && !!promotion){
      if(hourPlay > 0){
        data.user_promotion_start_date = dayjs().toDate()
        data.user_promotion_end_date = dayjs().add(30,'d').toDate();
      } else {
        data.user_promotion_start_date = null
        data.user_promotion_end_date = null
      }
      const userPromotion:Partial<UserPromotion> = {
        user_promotion_purchase_date: new Date(),
        user,
        promotion,
        user_promotion_start_date:data.user_promotion_start_date,
        user_promotion_end_date:data.user_promotion_end_date,
        user_promotion_is_active: true,
        user_id: user.user_id,
        promotion_id: data.promotion_id,
        user_promotion_hours_left: promotion.promotion_hours - hourPlay
      }
      const newUserPromotion = this.userPromotionRepository.create(userPromotion)
      data.result = await this.userPromotionRepository.save(newUserPromotion)

    }

    const promotionUsage:Partial<PromotionUsage>={
      user_promotion_id: data.result.user_promotion_id,
      promotion_usage_date: new Date,
      promotion_usage_hour: hourPlay
    }
    const newPromotionUsage = this.promotionUsageRepository.create(promotionUsage)
    data.newPromotionUsageResult = this.promotionUsageRepository.save(newPromotionUsage)
    return data.result
  }

  async update(user_promotion_id: number, userPromotion: Partial<UserPromotion>): Promise<UserPromotion> {
    await this.userPromotionRepository.update(user_promotion_id, userPromotion);
    return this.userPromotionRepository.findOne({ where: { user_promotion_id } });
  }

  async delete(user_promotion_id: number): Promise<void> {
    await this.userPromotionRepository.delete(user_promotion_id);
  }
}