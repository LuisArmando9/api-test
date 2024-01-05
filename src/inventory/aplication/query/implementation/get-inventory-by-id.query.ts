import { IQuery } from '@nestjs/cqrs';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';

export class GetInventoryByIdQuery implements IQuery {
  constructor(readonly id: number) {}
}
