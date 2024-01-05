

const FIELDS = [
    "start_created",
    "end_created",
    "start_updated",
    "end_updated"
]
const COMMON_FIELDS = [
    "start_created",
    "end_created",
    "start_updated",
    "end_updated",
    "page",
    "limit",
    "start_date",
    "end_date",
    "type_date"
]

export const isCommonField = (field: string) => COMMON_FIELDS.some((f) => f === field)