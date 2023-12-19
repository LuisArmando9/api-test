import { BrandEntity } from "src/brand/infrestructure/entities/brand-entity";
import { ApiBaseEntity } from "src/core/auth/infrestructure/entities/base-entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: "products"})
export class ProductEntity extends ApiBaseEntity
{
    @Column({ type:"varchar", length:50})
	public name: string;
    @Column({ type:"varchar", length:50})
	public code: string;
    @Column({ type:"decimal"})
	public price: number;
    @Column({ type:"varchar", length:50})
	public status: any;
    @Column({ type:"varchar", length:500})
	public description: string;

    @Column({ type:"integer"})
	public brandId: number;
}