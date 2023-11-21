import { ApiProperty } from "@nestjs/swagger";
import { BrandStatus } from "./brand.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class SearchBrandDto {
    @ApiProperty({example: "coca cola", required: false})
    @IsString()
	@IsOptional()
    name: string;

	@ApiProperty({example: "enable|disable", required: false, type: BrandStatus})
    @IsEnum(BrandStatus)
	@IsOptional()
    status: BrandStatus;
}