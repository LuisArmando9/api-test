import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { CreateSupplierCommand } from '../implementation/create-supplier-commant';
import { BrandService } from 'src/brand/domain/services/brand-service';
import { SupplierService } from 'src/supplier/domain/services/supplier-service';


@CommandHandler(CreateSupplierCommand)
export class CreateSupplierHandler implements ICommandHandler<CreateSupplierCommand> {
    constructor(private readonly supplier_service: SupplierService){}
    async execute(command: CreateSupplierCommand){
        return await this.supplier_service.insert(command.dto);
    }
}
