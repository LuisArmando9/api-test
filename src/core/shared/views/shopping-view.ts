import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
    name: 'view_shoppings',
})
export class ViewShopping {
  @ViewColumn()
  id: number;

  @ViewColumn()
  inventory_id?: number;
  @ViewColumn()
  unit_price?: number;

  @ViewColumn()
  created_at: Date;

  @ViewColumn()
  updated_at: Date;
}
