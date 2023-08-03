import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';


@Injectable()
export class AuthService {
   constructor(private readonly userService:UsersService) {   }
  
  public async auth({email, password}: AuthDto) {
    return 'This action adds a new auth';
  }

  public async register(createUserDto: CreateUserDto) {
    const create = await this.userService.create(createUserDto)
    return create
  } 

  public async refresh(token:string) {
   return 
  } 


}
