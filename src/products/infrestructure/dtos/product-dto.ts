import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { isEmpty } from "lodash";

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
	@IsNumberString()
	@IsOptional()
	public price: number;

	@ApiProperty({example: "exists"})
	@IsString()
	@IsOptional()
	public status: any;

	@ApiProperty({example: 2})
	@IsNumberString()
	@IsOptional()
	public brand_id: number;
	
	@ApiProperty({example: "its deliciuos"})
	@IsString()
	@IsOptional()
	@MinLength(10, { message: 'Required min 10 of length to description'} )
    @MaxLength(255, { message: 'Max length is 255 length to description'} )
	public description: string;

	@ApiProperty({example: 2})
	@IsNumberString()
	@IsDefined()
	reorder_point: number;

	@ApiHideProperty()
	public image: string;

	@ApiProperty({ type: 'string', format: 'binary', required: true })
	public buffer_file: Express.Multer.File ;

	public user_id: number;


}


export class UpdateProductDto {
	public id?: number;

	@ApiProperty({example: "coca cola", required: false})
	@IsString()
	@IsOptional()
	public name: string;

	@ApiProperty({example: "UKFX", required: false})
	@IsString()
	@IsOptional()
	public code: string;

	@ApiProperty({example: 24, required: false})
	@IsNumberString()
	@IsOptional()
	public price: number;

	@ApiProperty({example: "exists", required: false})
	@IsString()
	@IsOptional()
	public status: any;

	@ApiProperty({example: 2, required: false})
	@IsNumberString()
	@IsOptional()
	public brand_id: number;
	
	@ApiProperty({example: "its deliciuos", required: false})
	@IsString()
	@IsOptional()
	@MinLength(10, { message: 'Required min 10 of length to description'} )
    @MaxLength(255, { message: 'Max length is 255 length to description'} )
	public description: string;

	@ApiProperty({example: 2, required: false})
	@IsNumberString()
	@IsDefined()
	reorder_point: number;

	@ApiHideProperty()
	public image: string;

	@ApiProperty({ type: 'string', format: 'binary', required: false })
	public buffer_file: Express.Multer.File ;

	public user_id: number;


}