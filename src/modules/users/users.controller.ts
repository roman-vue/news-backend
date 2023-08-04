import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessGuardGuard } from 'src/guards/access-guard.guard';
@ApiBearerAuth()
@UseGuards(AccessGuardGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary:'crear un usuario'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary:'lista de usuarios'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:'busqueda de un usuario'})
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put('updated/:id')
  @ApiOperation({summary:'editar un usuario'})
  update(@Param('id') id: string, @Body() updateUserDto:UpdateDto) {
    return this.usersService.update(id, updateUserDto);
  }

}
