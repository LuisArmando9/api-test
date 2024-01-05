import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDefined, IsString } from "class-validator";
import { IBaseDto } from "src/core/shared/interfaces/base-dto-interface";

export class CreatePaymentTypeDto implements IBaseDto{
    @IsDefined()
    @IsString()
    @ApiProperty({example:"debit"})
    name: string;

    user_id: number;
}
