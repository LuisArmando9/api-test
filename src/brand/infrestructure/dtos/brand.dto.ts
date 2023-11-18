import { ApiProperty } from "@nestjs/swagger";
export enum BrandStatus {
	ENABLE = "enable",
	DISABLE = "disable"

}
export class BrandDto {
	public id?: number;

	@ApiProperty({example: "coca cola"})
	public name: string;

	@ApiProperty({example: "exists"})
	public status: BrandStatus;
	
	@ApiProperty({example: "its deliciuos"})
	public description: string;

	public userId: number;
}