import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { CommonSearchDto } from "src/core/shared/dto/common-dto";
import { SearchCommonObject } from "src/core/shared/interfaces/search-common-obj";

export class SearchInventoryDto extends CommonSearchDto {
   
    @ApiProperty({example:"foca cola", required:false})
    @IsOptional()
    @IsString()
    product_name: string;

    @ApiProperty({example:3, required:false})
    @IsOptional()
    @IsNumber()
    @IsNumberString()
    product_id: number;


}