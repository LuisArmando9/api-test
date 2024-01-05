import { ViewColumn, ViewEntity } from "typeorm";



@ViewEntity({
  name: 'view_sales'})
export class SaleView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  id_product: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  brand_name: string;

  @ViewColumn()
  quantity_sold: number;

  @ViewColumn()
  total_amount: number;

  @ViewColumn()
  created_at: Date;

  @ViewColumn()
  updated_at: Date;
}