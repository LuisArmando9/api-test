import { BadRequestException, NotFoundException } from "@nestjs/common";

export class OrderNotFound extends NotFoundException {
    constructor() {
        super("Order not found")
    }
}

export class InvalidAmountException extends BadRequestException {
    constructor() {
        super("the quantity ordered is greater than the purchase quantity")
    }
}