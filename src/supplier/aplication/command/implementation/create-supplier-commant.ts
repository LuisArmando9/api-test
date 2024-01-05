import { ICommand, IQuery } from '@nestjs/cqrs';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';
import { CreateSupplierDto } from 'src/supplier/infrestructure/dtos/create-supplier-dto';


export class CreateSupplierCommand implements ICommand {
  constructor(readonly dto: CreateSupplierDto) {}
}
