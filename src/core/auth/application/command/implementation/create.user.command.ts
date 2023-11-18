import { ICommand, IQuery } from '@nestjs/cqrs';
import { UserDto } from 'src/core/auth/infrestructure/dto/user.dto';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';


export class CreateUserCommand implements ICommand {
  constructor(readonly dto: UserDto) {}
}