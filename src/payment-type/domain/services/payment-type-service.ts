import { Injectable } from '@nestjs/common';
import { PaymentTypeAction, SupplierAction, UserBrandAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { InvalidDataException, PaymentTypeNotFoundException } from './exceptions/payment-exceptions';
import { PaymentTypeRepository } from 'src/payment-type/infrestructure/repositories/payment-type-repository';
import { PaymentType } from 'src/payment-type/infrestructure/entities/payment-type-entity';
import { CreatePaymentTypeDto } from 'src/payment-type/infrestructure/dtos/create-payment-type-dto';


@Injectable()
export class PaymentTypeService extends BaseRepository<PaymentType, unknown, CreatePaymentTypeDto > {
    constructor(
        private payment_repository: PaymentTypeRepository,
        private log_repository: UserLogRepository
    ) {
        super(
            log_repository, 
            payment_repository, 
            PaymentTypeAction, {
            invalid_data: new InvalidDataException(),
            not_found: new PaymentTypeNotFoundException()
        });
    }
    

}
