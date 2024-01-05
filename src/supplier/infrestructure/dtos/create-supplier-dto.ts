import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsString } from "class-validator";
import { IBaseDto } from "src/core/shared/interfaces/base-dto-interface";

export class CreateSupplierDto implements IBaseDto{
    @ApiProperty({example:"Femsa"})
    @IsDefined()
    @IsString()
    name: string;

    @IsDefined()
    @IsBoolean()
    @ApiProperty({example:true})
    active: boolean;

    user_id: number;
}
