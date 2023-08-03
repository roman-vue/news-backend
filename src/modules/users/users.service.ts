import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database/core/entities';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private readonly usersRepository: Repository<Users>){}
  public async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
    const save = await this.usersRepository.save(createUserDto)
    return save
  }

  public async findAll() {
    const find = await this.usersRepository.find()
    return find
  }

  public async findOne(id: string) {
    const find  = await this.usersRepository.findOne({where:{id:id}})
    if(!find) throw new NotFoundException(`losiento este id du usuario no existe ${id}`)
    return find
  }

  public async update(id: string, updateUserDto: UpdateDto) {
    const find =  await this.findOne(id)
    find.name = updateUserDto.name
    find.email = updateUserDto.email
    const uptate = await this.usersRepository.save(find)
    return uptate
  }

}
