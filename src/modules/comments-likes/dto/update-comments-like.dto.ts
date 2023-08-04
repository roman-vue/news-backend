import { PartialType } from '@nestjs/swagger';
import { CreateCommentsLikeDto } from './create-comments-like.dto';

export class UpdateCommentsLikeDto extends PartialType(CreateCommentsLikeDto) {}
