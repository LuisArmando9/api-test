import { compareSync, hash } from 'bcrypt';
import { ViewColumn, ViewEntity, BeforeInsert } from 'typeorm';

@ViewEntity({
  name: 'view_get_user',
})
export class GetUserView {
  @ViewColumn()
  password: string;

  @ViewColumn()
  email: string;
  @ViewColumn()
  id: string;

  public isValidPassword(password: string): boolean {
    return compareSync(password, this.password);
  }
}
