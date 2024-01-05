import { NotFoundException, BadRequestException } from '@nestjs/common'

export class InventoryNotFoundException extends NotFoundException {
    constructor(){
        super("Not found inventory")
    }
}


export class InvalidInfoInventoryException extends BadRequestException {
    constructor(){
        super("Does not insert inventory, validate info")
    }
}