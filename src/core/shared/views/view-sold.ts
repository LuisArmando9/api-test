import { isObject, isString } from 'lodash';
import { ViewEntity, ViewColumn, PrimaryColumn } from 'typeorm';

type VTProduct = {
    id: string;
    name: string;
}
const parse_value = (value: any)=> {
    if (isObject(value)) return value
    try {
        return JSON.parse(value)
    } catch (error) {
        return value;
    }
}
@ViewEntity({
  name: 'view_sold_customer'
})
export class ViewSoldCustomer {
  @ViewColumn()
  total_sold: number;

  @ViewColumn()
  quantity: number;

  @ViewColumn()
  total_transaction: number;

  @ViewColumn()
  total: number;

  @ViewColumn()
  user_id: number;

  @ViewColumn()
  name: string;

  @ViewColumn({
    transformer: {
      to: (value: string) => parse_value(value),
      from: (value: any) => parse_value(value),
    },
  })
  products: VTProduct;
}
