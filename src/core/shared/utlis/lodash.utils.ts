import {isEmpty} from "lodash"
export const isNotEmpty = <T = any>(obj: T) => !isEmpty(obj);