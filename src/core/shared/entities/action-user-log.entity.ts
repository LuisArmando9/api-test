import { ApiBaseEntity } from "src/core/auth/infrestructure/entities/base-entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: "action_user_logs"})
export class UserLogEntity extends ApiBaseEntity
{
    @Column({ type:"varchar", length:100})
	public action: string;

    @Column({ type:"integer"})
	public user_id: number;
}