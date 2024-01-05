import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import { ApiBaseEntity } from "./base-entity";
import { compareSync, hash } from 'bcrypt';

@Entity({name: "users"})
export class UserEntity extends ApiBaseEntity
{

    @Column({ type:"varchar", length:255})
	public email: string;

    @Column({ type:"varchar", length:500})
	public password: string;

    @Column({ type:"varchar", length:500})
	public name: string;

    @BeforeInsert()
    private async hashPassword(): Promise<void> {
      this.password = await hash(this.password, 10);
    }

    public isValidPassword(password: string): boolean {
        return compareSync(password, this.password);
    }
}