import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'view_inventory',
})
export class ViewInventory {
  @ViewColumn()
  id: number;

  @ViewColumn()
  supplier_name: string;

  @ViewColumn()
  supplier_id: number;

  @ViewColumn()
  product_name: string;

  @ViewColumn()
  price: number;

  @ViewColumn()
  reorder_point: number;

  @ViewColumn()
  brand_id: number;

  @ViewColumn()
  brand_name: string;

  @ViewColumn()
  product_id: number;

  @ViewColumn()
  quantity: number;

  @ViewColumn()
  created_at: Date;

  @ViewColumn()
  updated_at: Date;
}
