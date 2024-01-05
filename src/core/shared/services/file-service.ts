import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "nestjs-cloudinary";

@Injectable()
export class FileService {
    constructor(private readonly cloudinary_service: CloudinaryService){}
    async upload(file: Express.Multer.File ): Promise<string | null>{
        try {
            const response = await this.cloudinary_service.uploadFile(file);
            return response.url;
        } catch (error) {
            return null;
        }
        
    }
}