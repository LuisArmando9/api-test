import { NotFoundException, BadRequestException } from '@nestjs/common'

export class PaymentTypeNotFoundException extends NotFoundException {
    constructor(){
        super("Not found PaymentType")
    }
}

export class InvalidDataException extends NotFoundException {
    constructor(){
        super("Invalid data to insert PaymentType")
    }
}

export class AlreadyPaymentTypeException extends BadRequestException {
    constructor(){
        super("Already payment type exists")
    }
}