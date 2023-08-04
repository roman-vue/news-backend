import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { News } from 'src/database/core/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([News]), JwtModule, UsersModule],
  controllers: [NewsController],
  providers: [NewsService],
  exports:[NewsService]
})
export class NewsModule {}
