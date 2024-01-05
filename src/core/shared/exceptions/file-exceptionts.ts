import { BadRequestException } from "@nestjs/common";

export class FileNotUploadException extends BadRequestException {
    constructor(){
        super("Does not upload file, internal server error")
    }
}