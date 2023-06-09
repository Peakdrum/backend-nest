import { Module } from '@nestjs/common';
import { UserPromotionsController } from './user-promotions.controller';
import { UserPromotionsService } from './user-promotions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPromotion } from './user-promotion.entity';
import { User } from 'src/users/user.entity';
import { Promotion } from 'src/promotions/promotion.entity';
import { PromotionUsage } from 'src/promotion-usages/promotion-usage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPromotion]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Promotion]),
    TypeOrmModule.forFeature([PromotionUsage])],
  controllers: [UserPromotionsController],
  providers: [UserPromotionsService]
})
export class UserPromotionsModule {}
