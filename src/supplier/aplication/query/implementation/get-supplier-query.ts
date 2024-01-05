import { IQuery } from '@nestjs/cqrs';
import { SearchBrandDto } from 'src/brand/infrestructure/dtos/search-brand-dto';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';
import { SearchSupplierDto } from 'src/supplier/infrestructure/dtos/search-supplier.dto';

export class GetSupplierQuery implements IQuery {
  constructor(readonly dto: SearchSupplierDto, readonly user_id: number) {}
}
