import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserPromotionsService } from './user-promotions.service';
import { UserPromotion } from './user-promotion.entity';
@Controller('user-promotions')
export class UserPromotionsController {
  constructor(private readonly userPromotionsService: UserPromotionsService) {}

  //get all users
  @Get()
  async findAll(): Promise<UserPromotion[]> {
    return this.userPromotionsService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserPromotion> {
    const user = await this.userPromotionsService.findOne(id);
    if (!user) {
      throw new NotFoundException('UserPromotion does not exist!');
    } else {
      return user;
    }
  }

  //create user promotion
  @Post()
  async create(@Body() userPromotion: UserPromotion): Promise<UserPromotion> {
    return this.userPromotionsService.create(userPromotion);
  }

  //update user
  @Put(':id')
  async update (@Param('id') id: number, @Body() userPromotion: UserPromotion): Promise<any> {
    return this.userPromotionsService.update(id, userPromotion);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if user does not exist
    const user = await this.userPromotionsService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.userPromotionsService.delete(id);
  }
}