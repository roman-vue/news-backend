import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({
    secret: `${process.env.JWT_ACCESS}`,
  }),UsersModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
