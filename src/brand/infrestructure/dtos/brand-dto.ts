import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
export enum BrandStatus {
	ENABLE = "enable",
	DISABLE = "disable"

}
export class BrandDto {
	public id?: number;

	@ApiProperty({example: "coca cola"})
	@IsString()
	@IsOptional()
	public name: string;

	@ApiProperty({example: "enable|disable", required: false})
	@IsOptional()
	public status: BrandStatus;
	
	@ApiProperty({example: "its deliciuos"})
	@IsString()
	@IsOptional()
	public description: string;

	public userId: number;
}