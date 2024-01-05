import { ApiBaseEntity } from "src/core/auth/infrestructure/entities/base-entity";
import { UserEntity } from "src/core/auth/infrestructure/entities/user-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PaymentTransaction } from "./payment-transactions.entity";

@Entity('payment_orders')
export class PaymentOrder extends ApiBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  sale_id: number;

  @Column()
  total_amount: number;

  @Column()
  remaining_amount: number;

  @Column()
  status: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => PaymentTransaction, transaction => transaction.order)
  transactions: PaymentTransaction[];
}