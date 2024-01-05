import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsNumberString, IsOptional } from "class-validator";

export enum TDate {
    UPDATE = "updated",
    CREATE = "created"
}

export class CommonSearchDto {
    @ApiProperty({example:new Date(),  required:false})
    @IsOptional()
    @IsDateString()
    start_date: Date;

    @ApiProperty({example:new Date(), required:false})
    @IsOptional()
    @IsDateString()
    end_date:Date;

    @ApiProperty({
        required: false,
        enum: TDate,
    })
    type_date:TDate


    
    @IsOptional()
    @IsNumberString()
    @ApiProperty({example:1,required:false})
    page: number;


    @IsOptional()
    @IsNumberString()
    @ApiProperty({example:10,  required:false})
    limit: number;
  
}