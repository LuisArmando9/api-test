import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { CreateProductCommand } from '../implementation/create-product-commant';
import { ProductService } from 'src/products/domain/services/product-service';
import { DeleteProductCommand } from '../implementation/delete-product-command';


@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
    constructor(private readonly product_service: ProductService){}
    async execute(command: DeleteProductCommand){
        return await this.product_service.softDelete(command.id, command.user_id)
    }
}
