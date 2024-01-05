import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { CreatePaymentTypeCommand } from '../implementation/create-payment-type-commant';
import { PaymentTypeService } from 'src/payment-type/domain/services/payment-type-service';


@CommandHandler(CreatePaymentTypeCommand)
export class CreatePaymentTypeHandler implements ICommandHandler<CreatePaymentTypeCommand> {
    constructor(private readonly service: PaymentTypeService){}
    async execute(command: CreatePaymentTypeCommand){
        return await this.service.insert(command.dto);
    }
}
