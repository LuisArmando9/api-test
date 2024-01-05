import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { UpdateSupplierCommand } from '../implementation/update-supplier-command';
import { BrandService } from 'src/brand/domain/services/brand-service';
import { SupplierService } from 'src/supplier/domain/services/supplier-service';


@CommandHandler(UpdateSupplierCommand)
export class UpdateSupplierHandler implements ICommandHandler<UpdateSupplierCommand> {
    constructor(private readonly supplier_service: SupplierService){}
    async execute(command: UpdateSupplierCommand){
       return await this.supplier_service.update(command.dto as any);
    }
}
