import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductService } from 'src/products/domain/services/product.service';
import { UpdateBrandCommand } from '../implementation/update.brand.command';
import { BrandService } from 'src/brand/domain/services/brand.service';


@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand> {
    constructor(private readonly brandService: BrandService){}
    async execute(command: UpdateBrandCommand){
       return await this.brandService.update(command.dto);
    }
}
