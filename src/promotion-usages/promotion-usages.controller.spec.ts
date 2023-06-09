import { Test, TestingModule } from '@nestjs/testing';
import { PromotionUsagesController } from './promotion-usages.controller';

describe('PromotionUsagesController', () => {
  let controller: PromotionUsagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionUsagesController],
    }).compile();

    controller = module.get<PromotionUsagesController>(PromotionUsagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
