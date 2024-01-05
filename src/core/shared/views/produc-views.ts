import { ViewColumn, ViewEntity } from 'typeorm';
@ViewEntity({
  name: 'view_get_product'
})
export class GetProductView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  code: string;

  @ViewColumn()
  price: number;

  @ViewColumn()
  image: number;

  @ViewColumn()
  brand_id: number;



  @ViewColumn()
  status: string;

  @ViewColumn()
  description: string;

  @ViewColumn()
  updated_at: Date;

  @ViewColumn()
  created_at: Date;
}