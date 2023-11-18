import { ApiProperty } from "@nestjs/swagger";
import { BrandStatus } from "./brand.dto";

export class SearchBrandDto {
    @ApiProperty({example: "coca cola"})
    name: string;

	@ApiProperty({example: "enable|disable"})
    status: BrandStatus;
}