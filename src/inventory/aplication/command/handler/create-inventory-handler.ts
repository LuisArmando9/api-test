import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { CreateInventoryCommand } from '../implementation/create-inventory-commant';
import { ProductService } from 'src/products/domain/services/product-service';
import { InventoryService } from 'src/inventory/domain/services/inventory-service';


@CommandHandler(CreateInventoryCommand)
export class CreateInventoryHandler implements ICommandHandler<CreateInventoryCommand> {
    constructor(private readonly service: InventoryService){}
    async execute(command: CreateInventoryCommand){
        return await this.service.insert(command.dto);
    }
}
