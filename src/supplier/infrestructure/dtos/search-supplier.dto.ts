import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { CommonSearchDto } from "src/core/shared/dto/common-dto";
import { SearchCommonObject } from "src/core/shared/interfaces/search-common-obj";

export class SearchSupplierDto extends CommonSearchDto {
    @ApiProperty({example:"Foca cola", required: false})
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({example:"enable", required:false})
    status: string;
}