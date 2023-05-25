import { Entity, PrimaryGeneratedColumn, Column,  } from "typeorm";

@Entity()
export class Promotion {
    @PrimaryGeneratedColumn()
    promotion_id: number;

    @Column()
    promotion_name: string;

    @Column()
    promotion_description: string;

    @Column()
    promotion_price: number;

    @Column()
    promotion_hours: number;

    @Column()
    promotion_is_monthly: boolean;

    @Column({ type: 'timestamptz' })
    promotion_expiry_date: Date;

    @Column()
    promotion_is_active: boolean;
}