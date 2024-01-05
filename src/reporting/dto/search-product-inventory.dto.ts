import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString } from "class-validator";
import { CommonSearchDto } from "src/core/shared/dto/common-dto";

export class SearchProductInventoryDto {
    
    @IsOptional()
    @IsNumberString()
    @ApiProperty({example:1, required:false, name:"product_id"})
    product_id: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({example:1, required:false})
    supplier_id: number;

    @IsOptional()
    @IsNumberString()
    @ApiProperty({example:1,required:false})
    page: number;


    @IsOptional()
    @IsNumberString()
    @ApiProperty({example:10,  required:false})
    limit: number;

}