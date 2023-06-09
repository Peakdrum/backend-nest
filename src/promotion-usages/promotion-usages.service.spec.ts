import { Test, TestingModule } from '@nestjs/testing';
import { PromotionUsagesService } from './promotion-usages.service';

describe('PromotionUsagesService', () => {
  let service: PromotionUsagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionUsagesService],
    }).compile();

    service = module.get<PromotionUsagesService>(PromotionUsagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
