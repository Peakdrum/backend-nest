import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { Promotion } from './promotion.entity'

function addYears(date, years) {
  date.setFullYear(date.getFullYear() + years);
  return date;
}

@Controller('promotions')
export class PromotionsController {
    constructor(private readonly promotionsService: PromotionsService) {}

    //get all promotions
    @Get()
    async findAll(): Promise<Promotion[]> {
      return this.promotionsService.findAll();
    }
  
    //get promotion by id
    @Get(':promotion_id')
    async findOne(@Param('promotion_id') id: number): Promise<Promotion> {
      const promotion = await this.promotionsService.findOne(id);
      if (!promotion) {
        throw new NotFoundException('Promotion does not exist!');
      } else {
        return promotion;
      }
    }
  
    //create promotion
    @Post()
    async create(@Body() promotion: Promotion): Promise<Promotion> {
      const date = new Date('2022-05-15T00:00:00.000Z');
      promotion.promotion_expiry_date = addYears(date, 3);
      promotion.promotion_is_active = true;

      return this.promotionsService.create(promotion);
    }
  
    //update promotion
    @Put(':promotion_id')
    async update (@Param('promotion_id') promotion_id: number, @Body() promotion: Promotion): Promise<any> {
      return this.promotionsService.update(promotion_id, promotion);
    }
  
    //delete user
    @Delete(':promotion_id')
    async delete(@Param('promotion_id') promotion_id: number): Promise<any> {
      //handle error if user does not exist
      const promotion = await this.promotionsService.findOne(promotion_id);
      if (!promotion) {
        throw new NotFoundException('Promotion does not exist!');
      }
      return this.promotionsService.delete(promotion_id);
    }
}
