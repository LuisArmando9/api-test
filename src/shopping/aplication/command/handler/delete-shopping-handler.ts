import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { DeleteShoppingCommand } from '../implementation/delete-shopping-command';
import { BrandService } from 'src/brand/domain/services/brand-service';
import { ShoppingService } from 'src/shopping/domain/services/shopping-service';


@CommandHandler(DeleteShoppingCommand)
export class DeleteShoppingHandler implements ICommandHandler<DeleteShoppingCommand> {
    constructor(private readonly shopping_service: ShoppingService){}
    async execute(command: DeleteShoppingCommand){
        return await this.shopping_service.softDelete(command.id, command.user_id)
    }
}
