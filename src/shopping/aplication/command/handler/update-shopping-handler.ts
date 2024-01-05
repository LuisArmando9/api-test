import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { UpdateShoppingCommand } from '../implementation/update-shopping-command';
import { BrandService } from 'src/brand/domain/services/brand-service';
import { ShoppingService } from 'src/shopping/domain/services/shopping-service';


@CommandHandler(UpdateShoppingCommand)
export class UpdateShoppingHandler implements ICommandHandler<UpdateShoppingCommand> {
    constructor(private readonly service: ShoppingService){}
    async execute(command: UpdateShoppingCommand){
       return await this.service.update(command.dto as any);
    }
}
