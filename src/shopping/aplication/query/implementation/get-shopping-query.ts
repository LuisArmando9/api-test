import { IQuery } from '@nestjs/cqrs';
import { SearchBrandDto } from 'src/brand/infrestructure/dtos/search-brand-dto';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';
import { SearchShoppingDto } from 'src/Shopping/infrestructure/dtos/search-Shopping.dto';

export class GetShoppingQuery implements IQuery {
  constructor(readonly dto: SearchShoppingDto, readonly user_id: number) {}
}
