import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({default: 'user@gmail.com'})
    @IsEmail()
    email:string

    @ApiProperty({default: 'Qwerty123'})
    @IsString()
    password:string
}
