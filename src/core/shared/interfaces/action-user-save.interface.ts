import { UserBrandAction, UserProductAction } from "../enums/user-action-enum";

export class IActionUserSave {
    user_id: number;
    action: UserProductAction |  UserBrandAction;
    after_data?: any;
    before_data?: any;
}