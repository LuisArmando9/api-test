import { ICommand, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';


export class CreateProductCommand implements ICommand {
  constructor(readonly dto: ProductDto) {}
}
