import { UserBrandAction, UserProductAction } from "../enums/user-action-enum";

export class IActionUserSave {
    userId: number;
    action: UserProductAction |  UserBrandAction;
}