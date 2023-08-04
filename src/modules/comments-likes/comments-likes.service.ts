import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentsLikeDto } from './dto/create-comments-like.dto';
import { UpdateCommentsLikeDto } from './dto/update-comments-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments, Likes } from 'src/database/core/entities';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken'
import { IComments } from './interface/comment.interface';
import { NewsService } from '../news/news.service';
import { ILike } from './interface/like.interface';

@Injectable()
export class CommentsLikesService {
  constructor(@InjectRepository(Comments)private readonly commentsRepository: Repository<Comments>,
  @InjectRepository(Likes)private readonly likesRepository: Repository<Likes>,
  private readonly userService:UsersService,
  private readonly newService:NewsService) {}
  
  public async create(newId:string,createCommentsLikeDto: CreateCommentsLikeDto, token:string) {
    const decoded = await jwt.decode(token)
    const verifyUser = await this.userService.findOne(decoded.sub.toString());
    const verifyNews = await this.newService.findOne(newId)
    const newComment :IComments={
       content: createCommentsLikeDto.content,
       news:verifyNews,
       user:verifyUser
    }
    const save = await this.commentsRepository.save(newComment);
    return save
  }


  public async update(commentId: string, updateCommentsLikeDto: UpdateCommentsLikeDto) {
   const find = await this.commentsRepository.findOne({where:{id: commentId}})
   if(!find){
    throw new NotFoundException(`losiento este comentario no existe`)
   }
   find.content = updateCommentsLikeDto.content
   const save = await this.commentsRepository.save(find)
  }

  public async like(newId:string,token:string){
    const decoded = await jwt.decode(token)
    const verifyUser = await this.userService.findOne(decoded.sub.toString());
    const verifyNews = await this.newService.findOne(newId)
    const newLike :ILike={
       news:verifyNews,
       user:verifyUser
    }
    const save = await this.likesRepository.save(newLike);
    return save
  }

  public async remove(commentId: string) {
    const find = await this.commentsRepository.findOne({where:{id: commentId}})
   if(!find){
    throw new NotFoundException(`losiento este comentario no existe`)
   }
   const remove = await this.commentsRepository.remove(find)
  }
}
