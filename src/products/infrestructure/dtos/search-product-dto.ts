import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumberString, IsOptional, IsString, IsNumber } from "class-validator";
import {
  
    IPaginationOptions,
  } from 'nestjs-typeorm-paginate';
export class SearchProductDto implements IPaginationOptions {
    @ApiProperty({example: "coca cola", required: false})
    @IsString()
	@IsOptional()
    name: string;

	@ApiProperty({example: "UKFX",  required: false})
    @IsString()
	@IsOptional()
    code: string;

	@ApiProperty({example: new Date(), required: false})
    @IsDateString()
	@IsOptional()
    updated: string;
    
	@ApiProperty({example: new Date(), required: false})
    @IsDateString()
	@IsOptional()
    created: Date;

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