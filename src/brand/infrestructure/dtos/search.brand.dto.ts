import { ApiProperty } from "@nestjs/swagger";
import { BrandStatus } from "./brand.dto";

export class SearchBrandDto {
    @ApiProperty({example: "coca cola", required: false})
    name: string;

	@ApiProperty({example: "enable|disable", required: false})
    status: BrandStatus;
}