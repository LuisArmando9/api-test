import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDto {
	public id?: number;

	@ApiProperty({example: "coca cola"})
	@IsString()
	@IsOptional()
	public name: string;

	@ApiProperty({example: "UKFX"})
	@IsString()
	@IsOptional()
	public code: string;

	@ApiProperty({example: 24})
	@IsNumber()
	@IsOptional()
	public price: number;

	@ApiProperty({example: "exists"})
	@IsString()
	@IsOptional()
	public status: any;

	@ApiProperty({example: 2})
	@IsString()
	@IsOptional()
	public brandId: number;
	
	@ApiProperty({example: "its deliciuos"})
	@IsString()
	@IsOptional()
	public description: string;

	public userId: number;
}