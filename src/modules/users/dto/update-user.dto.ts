import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateDto {
    @ApiProperty({default:'user@gmail.com'})
    @IsEmail()
    email: string;
    @ApiProperty({default: 'user1'})
    @IsString()
    name: string;
}

