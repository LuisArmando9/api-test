import { NotFoundException, BadRequestException } from '@nestjs/common'

export class UserNotFoundException extends NotFoundException {
    constructor(){
        super("Not found user")
    }
}


export class InvalidPasswordException extends BadRequestException {
    constructor(){
        super("Does not match password")
    }
}


export class AlreadyEmailExistsException extends BadRequestException {
    constructor(){
        super("Already exists email")
    }
}