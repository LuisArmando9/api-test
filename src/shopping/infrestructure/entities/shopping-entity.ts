
import { ApiBaseEntity } from 'src/core/auth/infrestructure/entities/base-entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({
  name:"shoppings"
})
export class Shopping extends ApiBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  inventory_id?: number;
  @Column()
  unit_price?: number;
}
