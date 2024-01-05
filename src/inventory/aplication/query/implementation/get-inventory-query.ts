import { IQuery } from '@nestjs/cqrs';
import { SearchInventoryDto } from 'src/inventory/infrestructure/dtos/search-invetory-dto';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';

export class GetInventoryByDtoQuery implements IQuery {
  constructor(readonly dto: SearchInventoryDto, readonly user_id: number) {}
}
