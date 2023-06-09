import { UserPromotion } from "src/user-promotions/user-promotion.entity";
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class PromotionUsage {
    @PrimaryGeneratedColumn()
    promotion_usage_id: number;

    @ManyToOne(type=>UserPromotion)
    @JoinColumn({ name: "user_promotion_id" })
    user_promotion: UserPromotion;

    @Column()
    user_promotion_id: number

    @Column({ type: 'timestamptz' })
    promotion_usage_date: Date;

    @Column()
    promotion_usage_hour: number;

}