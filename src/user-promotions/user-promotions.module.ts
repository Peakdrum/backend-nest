import { Module } from '@nestjs/common';
import { UserPromotionsController } from './user-promotions.controller';
import { UserPromotionsService } from './user-promotions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPromotion } from './user-promotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPromotion])],
  controllers: [UserPromotionsController],
  providers: [UserPromotionsService]
})
export class UserPromotionsModule {}
