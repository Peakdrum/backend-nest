import { Test, TestingModule } from '@nestjs/testing';
import { UserPromotionsController } from './user-promotions.controller';

describe('UserPromotionsController', () => {
  let controller: UserPromotionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPromotionsController],
    }).compile();

    controller = module.get<UserPromotionsController>(UserPromotionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
