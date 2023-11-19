import { ApiProperty } from "@nestjs/swagger";

export class SearchProductDto {
    @ApiProperty({example: "coca cola", required: false})
    name: string;

	@ApiProperty({example: "UKFX",  required: false})
    code: string;

	@ApiProperty({example: new Date(), required: false})
    updated: string;
    
	@ApiProperty({example: new Date(), required: false})
    created: Date;
}