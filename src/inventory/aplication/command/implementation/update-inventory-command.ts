import { ICommand, IQuery } from '@nestjs/cqrs';
import { UpdateInventoryDto } from 'src/inventory/infrestructure/dtos/update-inventory-dto';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';


export class UpdateInventoryCommand implements ICommand {
  constructor(readonly dto: UpdateInventoryDto) {}
}
