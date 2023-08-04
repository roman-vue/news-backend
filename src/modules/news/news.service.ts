import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { News } from 'src/database/core/entities';
import { INews } from './interface/news.interface';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class NewsService {
   constructor(
    @InjectRepository(News) private readonly newsRepository: Repository<News>,
    private readonly userService:UsersService){}

  public async create({title,tag,content}: CreateNewsDto, token:string) {
    const decoded = await jwt.decode(token)
    const verifyUser = await this.userService.findOne(decoded.sub.toString());
    const created:INews = {
      title,
      tag,
      content,
      user:verifyUser
    } 
    const save = await this.newsRepository.save(created)
    return save
  }

  public async findAll() {
   const find = await this.newsRepository.find({relations:['comments', 'likes']})
   return find
  }

  public async myNews(token:string) {
    const decoded = await jwt.decode(token)
    const verifyUser = await this.userService.findOne(decoded.sub.toString());
    const list = await this.newsRepository.find({where:{user:verifyUser}, relations:['comments', 'likes']})
    return list
  }

  public async findOne(id: string) {
    const find = await this.newsRepository.findOne({where:{id:id}})
    if(!find){
      throw new NotFoundException(`losiento este id ${id} de noticia no existe`)
    }
    return find
  }

  public async update(id: string, {title, tag, content}: UpdateNewsDto) {
   const find = await this.findOne(id)
   find.title = title
   find.tag = tag
   find.content = content
   const save = await this.newsRepository.save(find)
   return save

  }

  public async remove(id: string) {
    const find = await this.findOne(id)
    const remove = await this.newsRepository.remove(find)
  }
}
