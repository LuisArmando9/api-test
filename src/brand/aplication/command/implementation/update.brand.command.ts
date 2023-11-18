import { ICommand, IQuery } from '@nestjs/cqrs';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand.dto';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';


export class UpdateBrandCommand implements ICommand {
  constructor(readonly dto: BrandDto) {}
}
