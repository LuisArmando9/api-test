import { BadRequestException, NotFoundException } from "@nestjs/common";

export interface IThrowExceptionBase {
    not_found: NotFoundException,
    invalid_data: BadRequestException
}