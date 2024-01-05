import { ICommand, IQuery } from '@nestjs/cqrs';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';
import { CreateShoppingDto } from 'src/shopping/infrestructure/dtos/create-shopping-dto';


export class CreateShoppingCommand implements ICommand {
  constructor(readonly dto: CreateShoppingDto) {}
}
