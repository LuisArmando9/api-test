export enum UserProductAction {
    INSERT = "insert.product",
    DELETE = "delete.product",
    UPDATE = "update.product",
    GET = "get.product",
    GET_BY_DTO = "get.by.dto.product"
}

export enum SupplierAction {
    INSERT = "insert.supplier",
    DELETE = "delete.supplier",
    UPDATE = "update.supplier",
    GET = "get.supplier",
    GET_BY_DTO = "get.by.dto.supplier"
}

export enum InventoryAction {
    INSERT = "insert.inventory",
    DELETE = "delete.inventory",
    UPDATE = "update.inventory",
    GET = "get.inventory",
    GET_BY_DTO = "get.by.dto.inventory"
}
export enum UserBrandAction {
    INSERT = "insert.brand",
    DELETE = "delete.brand",
    UPDATE = "update.brand",
    GET = "get.brand",
    GET_BY_DTO = "get.by.dto.brand"
}

export enum PaymentTypeAction {
    INSERT = "insert.paymentType",
    DELETE = "delete.paymentType",
    UPDATE = "update.paymentType",
    GET = "get.paymentType",
    GET_BY_DTO = "get.by.dto.paymentType"
}

export enum ShoppingAction {
    INSERT = "insert.Shopping",
    DELETE = "delete.Shopping",
    UPDATE = "update.Shopping",
    GET = "get.Shopping",
    GET_BY_DTO = "get.by.dto.Shopping"
}


export enum SaleAction {
    INSERT = "insert.sale",
    DELETE = "delete.sale",
    UPDATE = "update.sale",
    GET = "get.sale",
    GET_BY_DTO = "get.by.dto.sale"
}
export type LOG_ACTION = UserBrandAction | UserProductAction | InventoryAction | SupplierAction  | PaymentTypeAction  | ShoppingAction  | SaleAction ;
export type ACTION_TYPE_LOG = typeof UserProductAction | typeof UserBrandAction | typeof InventoryAction | typeof SupplierAction  | typeof PaymentTypeAction  | typeof ShoppingAction
| typeof SaleAction;
