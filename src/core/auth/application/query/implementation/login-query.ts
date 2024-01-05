import { IQuery } from '@nestjs/cqrs';
import { LoginDto, UserDto } from 'src/core/auth/infrestructure/dto/user-dto';

export class LoginQuery implements IQuery {
  constructor(readonly dto: LoginDto) {}
}
