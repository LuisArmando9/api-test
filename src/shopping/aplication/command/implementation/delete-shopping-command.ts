import { ICommand, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';


export class DeleteShoppingCommand implements ICommand {
  constructor(readonly id: number, readonly user_id: number) {}
}
