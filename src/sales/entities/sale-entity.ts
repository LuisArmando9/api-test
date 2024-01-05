// product-sale.entity.ts
import { ProductEntity } from 'src/products/infrestructure/entities/product-entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity("sales")
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;

  @Column()
  quantity: number;

  @Column()
  id_product: number;
  @Column()
  user_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
