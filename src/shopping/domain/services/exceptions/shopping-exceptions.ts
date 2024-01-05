import { NotFoundException, BadRequestException } from '@nestjs/common'

export class ShoppingNotFoundException extends NotFoundException {
    constructor(){
        super("Not found Shopping")
    }
}

export class InvalidDataException extends NotFoundException {
    constructor(){
        super("Not found Shopping")
    }
}