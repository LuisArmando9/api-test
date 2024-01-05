import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsNumber, IsString } from "class-validator";
import { IBaseDto } from "src/core/shared/interfaces/base-dto-interface";

export class CreateShoppingDto implements IBaseDto{
 

    @IsDefined()
    @IsNumber()
    @ApiProperty({example:2})
    inventory_id?: number;

    @IsDefined()
    @IsNumber()
    @ApiProperty({example:2})
    unit_price?: number;

    user_id: number;
}
