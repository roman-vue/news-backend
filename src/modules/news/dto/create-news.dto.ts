import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateNewsDto {
   @ApiProperty({default:'titutlo de noticia'})
   @IsString()
    title:string
   @ApiProperty({default:'tag'})
   @IsString()
    tag:string
   @ApiProperty({default:'contenido'})
   @IsString()
    content:string
}
