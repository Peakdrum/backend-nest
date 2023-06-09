import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionUsage } from './promotion-usage.entity';
import { UserPromotion } from 'src/user-promotions/user-promotion.entity';
import { Promotion } from 'src/promotions/promotion.entity';
import dayjs from 'dayjs';

@Injectable()
export class PromotionUsagesService {
  constructor(
    @InjectRepository(PromotionUsage)
    private promotionUsageRepository: Repository<PromotionUsage>,
    @InjectRepository(UserPromotion)
    private userPromotionRepository: Repository<UserPromotion>,
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>
  ) {}

  async findAll(): Promise<PromotionUsage[]> {
    return this.promotionUsageRepository.find();
  }

  async findOne(promotion_usage_id: number): Promise<PromotionUsage> {
    return this.promotionUsageRepository.findOne({ where: { promotion_usage_id } });
  }

  async create(promotionUsage: Partial<PromotionUsage>): Promise<PromotionUsage> {
    const hourPlay = promotionUsage.promotion_usage_hour
    const userPromotionId=promotionUsage.user_promotion_id
    const newPromotionUsage: Partial<PromotionUsage> = this.promotionUsageRepository.create(promotionUsage)
    const userPromotion:Partial<UserPromotion> = await this.userPromotionRepository.findOne({where:{user_promotion_id: userPromotionId}, relations:["promotion"]})
    if(!userPromotion.promotion.promotion_is_monthly && userPromotion.user_promotion_hours_left >= hourPlay){
      const newHoursLeft = userPromotion.user_promotion_hours_left - hourPlay
      var isActive = userPromotion.user_promotion_is_active
      if(newHoursLeft <= 0){
        isActive = false
      }
      this.userPromotionRepository.update(userPromotion.user_promotion_id, {...userPromotion, user_promotion_hours_left:newHoursLeft, user_promotion_is_active: isActive})
      return this.promotionUsageRepository.save(newPromotionUsage);
    } else {
      if(dayjs().diff(userPromotion.user_promotion_start_date,"d") <= 30 || userPromotion.user_promotion_start_date === null){
        if(userPromotion.user_promotion_start_date === null){
          this.userPromotionRepository.update(userPromotion.user_promotion_id,{...userPromotion, user_promotion_start_date: dayjs()})
        }
        return this.promotionUsageRepository.save(newPromotionUsage);
      } 
    }
  }

  async update(promotion_usage_id: number, promotionUsage: Partial<PromotionUsage>): Promise<PromotionUsage> {
    await this.promotionUsageRepository.update(promotion_usage_id, promotionUsage);
    return this.promotionUsageRepository.findOne({ where: { promotion_usage_id } });
  }

  async delete(promotion_id: number): Promise<void> {
    await this.promotionUsageRepository.delete(promotion_id);
  }
}