import { Controller, Post, Body, UseGuards, Get, Patch, Param, Request, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../../../common/enums';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
/*@UseGuards(JwtAuthGuard, RolesGuard)*/
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Listar todos los usuarios
  @Get()
 /* @Roles(RoleEnum.ADMINISTRADOR, RoleEnum.SUPERVISOR) */// Solo admins, directores y supervisores pueden ver la lista
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  /*@Roles(RoleEnum.ADMINISTRADOR)*/ // Solo admins pueden editar
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(Number(id), updateUserDto, req.user.id, req.user.role);
  }


  @Post('crear')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto); // No requiere adminId
  }

  /*
  // Crear usuario (Solo Administradores)
  @Post('crear')
  /!*@UseGuards(JwtAuthGuard, RolesGuard)*!/
  /!*@Roles(RoleEnum.ADMINISTRADOR)*!/
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.create(createUserDto, req.user.id);
  }*/


  @Get('auditar')
  /*@Roles(RoleEnum.ADMINISTRADOR)*/  // Solo los administradores pueden acceder
  async getAudit() {
    return this.usersService.getAudit();
  }

  // Obtener usuario por correo
  @Get('email/:email')
  /*@Roles(RoleEnum.ADMINISTRADOR, RoleEnum.SUPERVISOR)*/
  async findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // Listar usuarios por rol
  @Get('role/:role')
  /*@Roles(RoleEnum.ADMINISTRADOR, RoleEnum.SUPERVISOR)*/
  async findByRole(@Param('role') role: RoleEnum) {
    return this.usersService.findByRole(role);
  }

}