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
  status: string;

  @ViewColumn()
  description: string;
}