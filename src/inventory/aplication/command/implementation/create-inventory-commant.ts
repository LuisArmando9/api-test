import { ICommand, IQuery } from '@nestjs/cqrs';
import { CreateInventoryDto } from 'src/inventory/infrestructure/dtos/create-inventory-dto';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';


export class CreateInventoryCommand implements ICommand {
  constructor(readonly dto: CreateInventoryDto) {}
}
