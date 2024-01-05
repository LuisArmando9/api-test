import { NotFoundException, BadRequestException } from '@nestjs/common'

export class SupplierNotFoundException extends NotFoundException {
    constructor(){
        super("Not found supplier")
    }
}

export class InvalidDataException extends NotFoundException {
    constructor(){
        super("Not found supplier")
    }
}