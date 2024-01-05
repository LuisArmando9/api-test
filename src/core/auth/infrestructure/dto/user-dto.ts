import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @ApiProperty({example:"ah25632@gmail.com"})
    @IsEmail()
    @IsDefined()
    email: string;

    @ApiProperty({example:"44444"})
    @IsString()
    @IsDefined()
    @MinLength(5, { message: 'Required min five length two password'} )
    @MaxLength(20, { message: 'Max length is 20 for password'} )
    password: string;

    @ApiProperty({example:"Luis Armando"})
    @IsString()
    @IsDefined()
    @MinLength(5, { message: 'Required min five length two password'} )
    @MaxLength(20, { message: 'Max length is 20 for password'} )
    name: string;
}


export class LoginDto {
    @ApiProperty({example:"ah25632@gmail.com"})
    @IsEmail()
    @IsDefined()
    email: string;

    @ApiProperty({example:"44444"})
    @IsString()
    @IsDefined()
    @MinLength(5, { message: 'Required min five length two password'} )
    @MaxLength(20, { message: 'Max length is 20 for password'} )
    password: string;
}