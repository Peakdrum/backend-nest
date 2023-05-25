import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { User } from "src/users/user.entity";
import { Promotion } from "src/promotions/promotion.entity";

@Entity()
export class UserPromotion {
    @PrimaryGeneratedColumn()
    user_promotion_id: number;

    @OneToOne(()=>User)
    @JoinColumn()
    user: User;

    @OneToOne(()=>Promotion)
    @JoinColumn()
    promotion: Promotion;

    @Column({ type: 'timestamptz' })
    user_promotion_purchase_date: Date;

    @Column({ type: 'timestamptz' })
    user_promotion_start_date: Date;

    @Column({ type: 'timestamptz' })
    user_promotion_end_date: Date
}