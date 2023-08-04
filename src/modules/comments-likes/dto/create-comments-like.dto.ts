import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommentsLikeDto {
    @ApiProperty({default:'comentario'})
    @IsString()
    content:string
}
