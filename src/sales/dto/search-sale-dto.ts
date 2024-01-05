import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional } from "class-validator";
import { CommonSearchDto } from "src/core/shared/dto/common-dto";
import { SearchCommonObject } from "src/core/shared/interfaces/search-common-obj";

export class SearchSaleDto extends CommonSearchDto {
  
    @ApiProperty({example:2, required:false})
    @IsOptional()
    @IsNumber()
    @IsNumberString()
    product_id: number;
}