import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';
import { CreateBrandCommand } from '../implementation/create.brand.commant';
import { BrandService } from 'src/brand/domain/services/brand.service';


@CommandHandler(CreateBrandCommand)
export class CreateBrandHandler implements ICommandHandler<CreateBrandCommand> {
    constructor(private readonly brandService: BrandService){}
    async execute(command: CreateBrandCommand){
        return await this.brandService.insert(command.dto);
    }
}
