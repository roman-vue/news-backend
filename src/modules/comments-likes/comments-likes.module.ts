import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { CommentsLikesService } from './comments-likes.service';
import { CommentsLikesController } from './comments-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments, Likes } from 'src/database/core/entities';
import { UsersModule } from '../users/users.module';
import { NewsModule } from '../news/news.module';

@Module({
  imports:[TypeOrmModule.forFeature([Comments, Likes]),JwtModule,NewsModule, UsersModule],
  controllers: [CommentsLikesController],
  providers: [CommentsLikesService]
})
export class CommentsLikesModule {}
