import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CommonSearchDto } from "src/core/shared/dto/common-dto";

export class SearchLogDto extends CommonSearchDto {
    @ApiProperty({example:"insert", required:false})
    @IsOptional()
    @IsString()
    action: string;

    user_id: string | number;
}