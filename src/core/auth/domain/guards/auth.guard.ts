import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { isNotEmpty } from 'src/core/shared/utlis/lodash.utils';

@Injectable()
export class ApiAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if (isNotEmpty(err) || isEmpty(user)) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
