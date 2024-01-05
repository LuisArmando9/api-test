import { ICommand, IQuery } from '@nestjs/cqrs';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { UpdateSupplierDto } from 'src/supplier/infrestructure/dtos/update-supplier-dto';


export class UpdateShoppingCommand implements ICommand {
  constructor(readonly dto: UpdateSupplierDto) {}
}
