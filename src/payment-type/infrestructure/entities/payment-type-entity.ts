
import { ApiBaseEntity } from 'src/core/auth/infrestructure/entities/base-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({
  name:"payment_types"
})
export class PaymentType extends ApiBaseEntity{
 @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
