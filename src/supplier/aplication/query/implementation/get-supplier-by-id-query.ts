import { IQuery } from '@nestjs/cqrs';
import { SearchBrandDto } from 'src/brand/infrestructure/dtos/search-brand-dto';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';

export class GetSupplierByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
