import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";



export abstract class ApiBaseEntity
{
    @PrimaryGeneratedColumn()
	public id: number;

    @CreateDateColumn()
	public createdAt: Date;

    @UpdateDateColumn()
	public updatedAt: Date;
    
    @DeleteDateColumn()
	public deletedAt: Date;

    @BeforeInsert()
    private async setDates(): Promise<void> {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
    
    @BeforeUpdate()
    private async updateDates(): Promise<void> {
      this.updatedAt = new Date();
    }
}