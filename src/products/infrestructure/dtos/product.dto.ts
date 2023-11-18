import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
	public id?: number;

	@ApiProperty({example: "coca cola"})
	public name: string;

	@ApiProperty({example: "UKFX"})
	public code: string;

	@ApiProperty({example: 24})
	public price: number;

	@ApiProperty({example: "exists"})
	public status: any;

	@ApiProperty({example: 2})
	public brandid: number;
	
	@ApiProperty({example: "its deliciuos"})
	public description: string;

	public userId: number;
}