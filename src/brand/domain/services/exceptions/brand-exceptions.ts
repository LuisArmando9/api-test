import { NotFoundException, BadRequestException } from '@nestjs/common'

export class BrandNotFoundException extends NotFoundException {
    constructor(){
        super("Not found brand")
    }
}


export class InvalidBranDataException extends BadRequestException {
    constructor(){
        super("Does not insert brand, validate info")
    }
}