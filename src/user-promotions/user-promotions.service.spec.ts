import { Test, TestingModule } from '@nestjs/testing';
import { UserPromotionsService } from './user-promotions.service';

describe('UserPromotionsService', () => {
  let service: UserPromotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPromotionsService],
    }).compile();

    service = module.get<UserPromotionsService>(UserPromotionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
