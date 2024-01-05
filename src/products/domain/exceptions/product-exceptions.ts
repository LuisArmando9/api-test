import { NotFoundException, BadRequestException } from '@nestjs/common'

export class ProductNotFoundException extends NotFoundException {
    constructor(){
        super("Not found product by id")
    }
}


export class InvalidInfoException extends BadRequestException {
    constructor(){
        super("Does not insert product, validate info")
    }
}
export class AlreadyExistsCodeException extends BadRequestException {
    constructor(){
        super("Already exists code or sku of product")
    }

}