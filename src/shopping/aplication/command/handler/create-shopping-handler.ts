import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { CreateShoppingCommand } from '../implementation/create-shopping-commant';
import { BrandService } from 'src/brand/domain/services/brand-service';
import { ShoppingService } from 'src/shopping/domain/services/shopping-service';


@CommandHandler(CreateShoppingCommand)
export class CreateShoppingHandler implements ICommandHandler<CreateShoppingCommand> {
    constructor(private readonly shopping_service: ShoppingService){}
    async execute(command: CreateShoppingCommand){
        return await this.shopping_service.insert(command.dto);
    }
}
