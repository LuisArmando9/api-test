import { ApiProperty } from "@nestjs/swagger";
import { BrandStatus } from "./brand-dto";
import { IsEnum, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import {
  
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
export class SearchBrandDto implements IPaginationOptions {

    @ApiProperty({example: "coca cola", required: false})
    @IsString()
	@IsOptional()
    name: string;

	@ApiProperty({example: "enable|disable", required: false})
    @IsEnum(BrandStatus)
	@IsOptional()
    status: BrandStatus;

    @ApiProperty({example: 1, required: false})
    @IsNumber()
    @IsNumberString()
	@IsOptional()
    limit: number;

    @ApiProperty({example: 1, required: false})
    @IsNumber()
    @IsNumberString()
	@IsOptional()
    page: number;
}