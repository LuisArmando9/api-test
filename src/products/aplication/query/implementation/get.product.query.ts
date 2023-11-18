import { IQuery } from '@nestjs/cqrs';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search.product.dto';

export class GetProductByDtoQuery implements IQuery {
  constructor(readonly dto: SearchProductDto, readonly userId: number) {}
}
