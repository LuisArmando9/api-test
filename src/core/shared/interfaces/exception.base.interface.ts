import { BadRequestException, NotFoundException } from "@nestjs/common";

export interface IThrowExceptionBase {
    notFound: NotFoundException,
    invalidData: BadRequestException
}