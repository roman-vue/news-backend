import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch('sign-in')
  @ApiOperation({summary: 'iniciar session'})
  public async auth(@Body() AuthDto: AuthDto) {
    return this.authService.auth(AuthDto);
  }

  @Patch('sign-up')
  @ApiOperation({summary: 'registrarte en la plataforma'})
  public async register(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.register(CreateUserDto);
  }


  @Patch(':token')
  @ApiOperation({summary: 'genera nuevos token de acceso'})
  public async refresh(@Param('token') token:string) {
    return this.authService.refresh(token);
  }

}
