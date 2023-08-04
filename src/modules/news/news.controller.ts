import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuardGuard } from 'src/guards/access-guard.guard';
@ApiBearerAuth()
@UseGuards(AccessGuardGuard)
@ApiTags('News')
@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  create(@Body() createNewsDto: CreateNewsDto, @Request() req) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    return this.newsService.create(createNewsDto, token);
  }
  
  @Get('my-news')
  mynews(@Request() req) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    return this.newsService.myNews(token);
  }
  
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
