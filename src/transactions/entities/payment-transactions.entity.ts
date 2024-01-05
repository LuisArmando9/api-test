import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PaymentOrder } from './payment-order.entity';
import { ApiBaseEntity } from 'src/core/auth/infrestructure/entities/base-entity';

@Entity('payment_transactions')
export class PaymentTransaction extends ApiBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PaymentOrder, order => order.transactions)
  @JoinColumn({ name: 'order_id' })
  order: PaymentOrder;

  @Column()
  transaction_amount: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}