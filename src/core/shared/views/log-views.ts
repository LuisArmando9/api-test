import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'view_get_log',
})
export class GetLogView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  action: string;

  @ViewColumn()
  user_id: number;

  @ViewColumn()
  email: string;

  @ViewColumn()
  after_data: any;

  @ViewColumn()
  before_data: any;
}
