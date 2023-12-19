import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { DeleteBrandCommand } from '../implementation/delete-brand-command';
import { BrandService } from 'src/brand/domain/services/brand-service';


@CommandHandler(DeleteBrandCommand)
export class DeleteBrandHandler implements ICommandHandler<DeleteBrandCommand> {
    constructor(private readonly brand_service: BrandService){}
    async execute(command: DeleteBrandCommand){
        return await this.brand_service.softDelete(command.id, command.user_id)
    }
}
