import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumberString, IsOptional, IsString, IsNumber } from "class-validator";
import {
  
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
import { CommonSearchDto } from "src/core/shared/dto/common-dto";
export class SearchProductDto extends CommonSearchDto {
    @ApiProperty({example: "coca cola", required: false})
    @IsString()
	@IsOptional()
    name: string;

	@ApiProperty({example: "UKFX",  required: false})
    @IsString()
	@IsOptional()
    code: string;

    @ApiProperty({example: 2, required: false})
    @IsNumberString()
	@IsOptional()
    brand_id: number;
}