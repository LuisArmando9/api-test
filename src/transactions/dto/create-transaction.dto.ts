import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsNumber } from "class-validator";

export class CreateTransactionDto {
    user_id: number;
    @ApiProperty({example:2})
    @IsDefined()
    @IsNumber()
    sale_id: number;


    @IsDefined()
    @IsNumber()
    @ApiProperty({example:2})
    total_amount:number;
}

export class CreatePaymentTransactionDto {
    
    order_id: number;
    user_id: number;

    @IsDefined()
    @IsNumber()
    @ApiProperty({example:2})
    amount:number;
}

