import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PromotionsModule } from './promotions/promotions.module';
import { UserPromotionsModule } from './user-promotions/user-promotions.module';
import { PromotionUsagesModule } from './promotion-usages/promotion-usages.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PromotionsModule,
    UserPromotionsModule,
    PromotionUsagesModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}