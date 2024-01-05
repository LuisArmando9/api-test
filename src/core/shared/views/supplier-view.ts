import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'view_suppliers',
})
export class ViewSupplier {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
