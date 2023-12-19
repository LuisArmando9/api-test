import { ICommand, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';


export class DeleteProductCommand implements ICommand {
  constructor(readonly id: number, readonly user_id: number) {}
}
