import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "src/users/user.entity";
import { Promotion } from "src/promotions/promotion.entity";
import { PromotionUsage } from "src/promotion-usages/promotion-usage.entity";

@Entity()
export class UserPromotion {
    @PrimaryGeneratedColumn()
    user_promotion_id: number;

    @ManyToOne(type=>User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(type=>Promotion)
    @JoinColumn({ name: "promotion_id"})
    promotion: Promotion;

    @Column({ type: 'timestamptz' })
    user_promotion_purchase_date: Date;

    @Column({ type: 'timestamptz',nullable: true })
    user_promotion_start_date: Date;

    @Column({ type: 'timestamptz',nullable: true })
    user_promotion_end_date: Date;

    @Column({ nullable: true })
    user_id: number;
    
    @Column({ nullable: true })
    promotion_id: number;

    @Column({nullable:true})
    user_promotion_hours_left: number
      
    @Column({ nullable: true })
    user_promotion_is_active: boolean;

    @OneToMany(() => PromotionUsage, promotionUsage => promotionUsage.user_promotion)
    promotion_usages: PromotionUsage[]
}