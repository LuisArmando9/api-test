import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { ProductService } from 'src/products/domain/services/product-service';
import { DeleteInventoryCommand } from '../implementation/delete-inventory-command';
import { InventoryService } from 'src/inventory/domain/services/inventory-service';


@CommandHandler(DeleteInventoryCommand)
export class DeleteInventoryHandler implements ICommandHandler<DeleteInventoryCommand> {
    constructor(private readonly service: InventoryService){}
    async execute(command: DeleteInventoryCommand){
        return await this.service.softDelete(command.id, command.user_id)
    }
}
