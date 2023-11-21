import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @ApiProperty({example:"ajahha@gmail.com"})
    @IsEmail()
    @IsDefined()
    email: string;

    @ApiProperty({example:"34343"})
    @IsString()
    @IsDefined()
    @MinLength(5, { message: 'Required min five length two password'} )
    @MaxLength(20, { message: 'Max length is 20 for password'} )
    password: string;
}