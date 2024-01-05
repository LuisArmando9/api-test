import { IQuery } from '@nestjs/cqrs';
import { SearchShoppingDto } from 'src/shopping/infrestructure/dtos/search-Shopping.dto';

export class GetShoppingQuery implements IQuery {
  constructor(readonly dto: SearchShoppingDto, readonly user_id: number) {}
}
