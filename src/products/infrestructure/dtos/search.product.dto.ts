import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class SearchProductDto {
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
}