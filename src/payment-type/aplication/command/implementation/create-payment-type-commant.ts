import { ICommand, IQuery } from '@nestjs/cqrs';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';
import { CreatePaymentTypeDto } from 'src/payment-type/infrestructure/dtos/create-payment-type-dto';
import { CreateSupplierDto } from 'src/supplier/infrestructure/dtos/create-supplier-dto';


export class CreatePaymentTypeCommand implements ICommand {
  constructor(readonly dto: CreatePaymentTypeDto) {}
}
