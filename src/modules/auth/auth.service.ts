import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(private readonly userService:UsersService, private jwtService:JwtService) {   }
  
  public async auth({email, password}: AuthDto) {
    const verifyEmail = await this.userService.findByEmail(email);
    const compare = await bcrypt.compare(password, verifyEmail.password)
    if(compare){

      return {
        access_token: await this.generateAccessToken(verifyEmail.id),
         refresh_token: await this.generateRefreshToken(verifyEmail.id),
      }
    }
    throw new UnauthorizedException('Credenciales inválidas');

  }

  public async register(createUserDto: CreateUserDto) {
    const create = await this.userService.create(createUserDto)
    return create
  } 

  public async refresh(token:string) {
   const verify = await this.jwtService.verify(token,{secret:`${process.env.JWT_REFRESH}`})
   return {
     access_token: await this.generateAccessToken(verify.sub),
     refresh_token: await this.generateRefreshToken(verify.sub),
   }
  } 

  private async generateAccessToken(userId: string) {
    const payload = { sub: userId };
    const access = await this.jwtService.sign(payload, {expiresIn:'1d', secret:`${process.env.JWT_ACCESS}`})
    return access
  }

  private async generateRefreshToken(userId: string) {
    const payload = { sub: userId };
    const refresh = await this.jwtService.sign(payload, {expiresIn:'2d',secret:`${process.env.JWT_REFRESH}`}); // Token de refresco válido por 7 días
    return refresh
  }


}
