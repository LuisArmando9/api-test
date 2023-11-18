import { ApiProperty } from "@nestjs/swagger";

export class SearchProductDto {
    @ApiProperty({example: "coca cola"})
    name: string;

	@ApiProperty({example: "UKFX"})
    code: string;

	@ApiProperty({example: new Date()})
    updated: string;
    
	@ApiProperty({example: new Date()})
    created: Date;
}