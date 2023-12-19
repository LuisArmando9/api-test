export enum UserProductAction {
    INSERT = "insert.product",
    DELETE = "delete.product",
    UPDATE = "update.product",
    GET = "get.product",
    GET_BY_DTO = "get.by.dto.product"
}

export enum UserBrandAction {
    INSERT = "insert.brand",
    DELETE = "delete.brand",
    UPDATE = "update.brand",
    GET = "get.brand",
    GET_BY_DTO = "get.by.dto.brand"
}

export type LOG_ACTION = UserBrandAction | UserProductAction;
export type ACTION_TYPE_LOG = typeof UserProductAction | typeof UserBrandAction;