import { Module } from '@nestjs/common';
import { PromotionUsagesController } from './promotion-usages.controller';
import { PromotionUsagesService } from './promotion-usages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionUsage } from './promotion-usage.entity';
import { UserPromotion } from 'src/user-promotions/user-promotion.entity';
import { Promotion } from 'src/promotions/promotion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PromotionUsage]), 
    TypeOrmModule.forFeature([UserPromotion]),
    TypeOrmModule.forFeature([Promotion])
  ],
  controllers: [PromotionUsagesController],
  providers: [PromotionUsagesService]
})
export class PromotionUsagesModule {}
