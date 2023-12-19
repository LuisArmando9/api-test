import { ICommand, IQuery } from '@nestjs/cqrs';
import { BrandDto } from 'src/brand/infrestructure/dtos/brand-dto';


export class CreateBrandCommand implements ICommand {
  constructor(readonly dto: BrandDto) {}
}
