import { ICommand, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';


export class DeleteBrandCommand implements ICommand {
  constructor(readonly id: number, readonly userId: number) {}
}
