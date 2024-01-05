import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductService } from 'src/products/domain/services/product-service';
import { UpdateInventoryCommand } from '../implementation/update-inventory-command';
import { InventoryService } from 'src/inventory/domain/services/inventory-service';


@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler implements ICommandHandler<UpdateInventoryCommand> {
    constructor(private readonly service: InventoryService){}
    async execute(command: UpdateInventoryCommand){
       return await this.service.update(command.dto as any);
    }
}
