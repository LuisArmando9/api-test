import { LOG_ACTION, UserBrandAction, UserProductAction } from "../enums/user-action-enum";

export class IActionUserSave {
    user_id: number;
    action: LOG_ACTION;
    after_data?: any;
    before_data?: any;
}