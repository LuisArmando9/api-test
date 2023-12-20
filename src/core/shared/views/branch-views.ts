import { BrandStatus } from 'src/brand/infrestructure/dtos/brand-dto';
import { ViewColumn, ViewEntity } from 'typeorm';


@ViewEntity({
  name: 'view_get_brand'
})
export class GetBrandView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  status: string;

  @ViewColumn()
  description: string;

  public  isEnable = ()=> this.status === BrandStatus.ENABLE;
}
