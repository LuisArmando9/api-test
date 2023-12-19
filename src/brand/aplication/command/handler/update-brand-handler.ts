import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { UpdateBrandCommand } from '../implementation/update.brand.command';
import { BrandService } from 'src/brand/domain/services/brand-service';


@CommandHandler(UpdateBrandCommand)
export class UpdateBrandHandler implements ICommandHandler<UpdateBrandCommand> {
    constructor(private readonly brand_service: BrandService){}
    async execute(command: UpdateBrandCommand){
       return await this.brand_service.update(command.dto);
    }
}
