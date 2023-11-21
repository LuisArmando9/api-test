import { ApiBaseEntity } from "src/core/auth/infrestructure/entities/base.entity";
import { ProductEntity } from "src/products/infrestructure/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "brand"})
export class BrandEntity extends ApiBaseEntity
{
    @Column({ type:"varchar", length:50})
	public name: string;
  
    
    @Column({ type:"varchar", length:50})
	public status: string;
    
    @Column({ type:"varchar", length:500})
	public description: string;
}