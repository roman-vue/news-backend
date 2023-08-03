import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty({default:'user2'})
    @IsString()
    name:string;
    @ApiProperty({default:'user@gmail.com'})
    @IsEmail()
    email:string;
    @ApiProperty({default:'Qwerty123'})
    @IsString()
    @MinLength(8)
    password:string;
}
