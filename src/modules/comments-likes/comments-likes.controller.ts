import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { CommentsLikesService } from './comments-likes.service';
import { CreateCommentsLikeDto } from './dto/create-comments-like.dto';
import { UpdateCommentsLikeDto } from './dto/update-comments-like.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuardGuard } from 'src/guards/access-guard.guard';

@Controller()
export class CommentsLikesController {
  constructor(private readonly commentsLikesService: CommentsLikesService) {}
  
  @ApiBearerAuth()
  @UseGuards(AccessGuardGuard)
  @ApiTags('COMMENTS')
  @Post('/comment/:newId')
  create(@Param('newId') newId:string,@Body() createCommentsLikeDto: CreateCommentsLikeDto,@Request() req) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    return this.commentsLikesService.create(newId,createCommentsLikeDto, token);
  }

  @ApiBearerAuth()
  @UseGuards(AccessGuardGuard)
  @ApiTags('COMMENTS')
  @Put('/comment/:commentId')
  update(@Param('commentId') commentId: string, @Body() updateCommentsLikeDto: UpdateCommentsLikeDto) {
    return this.commentsLikesService.update(commentId, updateCommentsLikeDto);
  }

  @ApiBearerAuth()
  @UseGuards(AccessGuardGuard)
  @ApiTags('COMMENTS')
  @Delete('/comment/:commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentsLikesService.remove(commentId);
  } 
  
  @ApiBearerAuth()
  @UseGuards(AccessGuardGuard)
  @ApiTags('LIKES')
  @Patch('/like/:newId')
  like(@Param('newId') newId: string,@Request() req) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    return this.commentsLikesService.like(newId, token);
  }
}
