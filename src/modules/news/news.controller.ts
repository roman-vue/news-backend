import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessGuardGuard } from 'src/guards/access-guard.guard';
@ApiBearerAuth()
@UseGuards(AccessGuardGuard)
@ApiTags('News')
@Controller()
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({summary:'crear una noticia'})
  create(@Body() createNewsDto: CreateNewsDto, @Request() req) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    return this.newsService.create(createNewsDto, token);
  }
  
  @Get('my-news')
  @ApiOperation({summary:'listar noticias del perfil'})
  mynews(@Request() req) {
    const token = req.headers.authorization?.replace('Bearer ', '')
    return this.newsService.myNews(token);
  }
  
  @Get()
  @ApiOperation({summary:'listar todas las noticias'})
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'detalle de una noticia'})
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({summary:'editar una noticia'})
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'eliminar una noticia'})
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
