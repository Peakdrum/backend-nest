import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Promotion} from './promotion.entity';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,
  ) {}

  async findAll(): Promise<Promotion[]> {
    return this.promotionRepository.find();
  }

  async findOne(promotion_id: number): Promise<Promotion> {
    return this.promotionRepository.findOne({ where: { promotion_id } });
  }

  async create(promotion: Partial<Promotion>): Promise<Promotion> {
    const newuser = this.promotionRepository.create(promotion);
    return this.promotionRepository.save(newuser);
  }

  async update(promotion_id: number, promotion: Partial<Promotion>): Promise<Promotion> {
    await this.promotionRepository.update(promotion_id, promotion);
    return this.promotionRepository.findOne({ where: { promotion_id } });
  }

  async delete(promotion_id: number): Promise<void> {
    await this.promotionRepository.delete(promotion_id);
  }
}