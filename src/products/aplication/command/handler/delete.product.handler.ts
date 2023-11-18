import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';
import { CreateProductCommand } from '../implementation/create.product.commant';
import { ProductService } from 'src/products/domain/services/product.service';
import { DeleteProductCommand } from '../implementation/delete.product.command';


@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(private readonly productService: ProductService){}
    async execute(command: DeleteProductCommand){
        return await this.productService.softDelete(command.id, command.userId)
    }
}
