import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({example:"ajahha@gmail.com"})
    email: string;
    @ApiProperty({example:"34343"})
    password: string;
}