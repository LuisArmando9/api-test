import { BadRequestException, NotFoundException } from "@nestjs/common";

export class InventoryNotFound extends NotFoundException {
    constructor(){
        super("Not found inventory for product")
    }
}

export class SaleNotFound extends NotFoundException {
    constructor(){
        super("Not found sale for product")
    }
}
export class InvalidAmountProduct extends BadRequestException {
    constructor(){
        super("the number of products is less than requested, you cannot make a sale.")
    }
}

export class InvalidCreateSale extends BadRequestException {
    constructor(){
        super("Does not create product sale")
    }
}


export class NotUpdateSaleException extends BadRequestException {
    constructor(){
        super("Does not update sale")
    }
}