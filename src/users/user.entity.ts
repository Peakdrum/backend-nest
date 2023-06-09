import { UserPromotion } from "src/user-promotions/user-promotion.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    user_name: string;

    @Column()
    user_email: string;

    @Column()
    user_phone: string;

    @OneToMany(()=>UserPromotion, userPromotion => userPromotion.user)
    user_promotions: UserPromotion[]
}