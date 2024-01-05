import { ProductEntity } from 'src/products/infrestructure/entities/product-entity';
import { Supplier } from 'src/supplier/infrestructure/entities/supplier-entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'

@Entity("inventories")
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;
  
  @ManyToOne(() => ProductEntity, {eager: true })
  @JoinColumn({ name: 'id_product' })
  product: ProductEntity;

 
  @Column()
  quantity: number;

 
  @Column()
  id_product:number;

  @Column()
  user_id:number;

 
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
