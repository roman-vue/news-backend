import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { NewsModule } from './modules/news/news.module';


@Module({
  imports: [UsersModule, NewsModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
