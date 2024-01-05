import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { DeleteSupplierCommand } from '../implementation/delete-supplier-command';
import { BrandService } from 'src/brand/domain/services/brand-service';
import { SupplierService } from 'src/supplier/domain/services/supplier-service';


@CommandHandler(DeleteSupplierCommand)
export class DeleteSupplierHandler implements ICommandHandler<DeleteSupplierCommand> {
    constructor(private readonly supplier_service: SupplierService){}
    async execute(command: DeleteSupplierCommand){
        return await this.supplier_service.softDelete(command.id, command.user_id)
    }
}
