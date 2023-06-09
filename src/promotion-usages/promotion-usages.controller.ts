import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { PromotionUsagesService } from './promotion-usages.service';
import { PromotionUsage } from './promotion-usage.entity';

@Controller('promotion-usages')
export class PromotionUsagesController {
  constructor(private readonly promotionUsagesService: PromotionUsagesService) {}

  @Get()
  async findAll(): Promise<PromotionUsage[]> {
    return this.promotionUsagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PromotionUsage> {
    const promotionUsage = await this.promotionUsagesService.findOne(id);
    if (!promotionUsage) {
      throw new NotFoundException('User does not exist!');
    } else {
      return promotionUsage;
    }
  }

  @Post()
  async create(@Body() promotionUsage: PromotionUsage): Promise<PromotionUsage> {
    return this.promotionUsagesService.create(promotionUsage);
  }

  @Put(':id')
  async update (@Param('id') id: number, @Body() promotionUsage: PromotionUsage): Promise<any> {
    return this.promotionUsagesService.update(id, promotionUsage);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.promotionUsagesService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.promotionUsagesService.delete(id);
  }
}