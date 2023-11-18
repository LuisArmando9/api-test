import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductService } from 'src/products/domain/services/product.service';
import { UpdateProductCommand } from '../implementation/update.product.command';


@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
    constructor(private readonly productService: ProductService){}
    async execute(command: UpdateProductCommand){
       return await this.productService.update(command.dto);
    }
}
