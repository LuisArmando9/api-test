import { Entity, ViewEntity, ViewColumn, Connection, createConnection } from 'typeorm';


@ViewEntity({
  name: 'view_product_inventory'
})
export class ViewProductInventory {
  @ViewColumn()
  product_name: string;

  @ViewColumn()
  product_id: number;

  @ViewColumn()
  product_price: number;

  @ViewColumn()
  supplier_name: string;

  @ViewColumn()
  supplier_id: number;

  @ViewColumn()
  total: number;

  @ViewColumn()
  quantity_sold: number;

  @ViewColumn()
  revenue: number;

  @ViewColumn()
  available: number;
}