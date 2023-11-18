import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';
import { CreateProductCommand } from '../implementation/create.product.commant';
import { ProductService } from 'src/products/domain/services/product.service';


@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(private readonly productService: ProductService){}
    async execute(command: CreateProductCommand){
        return await this.productService.insert(command.dto);
    }
}
