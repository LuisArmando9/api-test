import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";



export abstract class ApiBaseEntity
{
    @PrimaryGeneratedColumn()
	public id: number;

    @CreateDateColumn()
	public created_at: Date;

    @UpdateDateColumn()
	public updated_at: Date;
    
    @DeleteDateColumn()
	public deleted_at: Date;

    @BeforeInsert()
    private async setDates(): Promise<void> {
      this.created_at = new Date();
      this.updated_at = new Date();
    }
    
    @BeforeUpdate()
    private async updateDates(): Promise<void> {
      this.updated_at = new Date();
    }
}