import { Controller, Post, Body, UseGuards, Get, Patch, Param, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../../../common/enums';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admin')
  @Roles(RoleEnum.ADMINISTRADOR, RoleEnum.SUPERVISOR, RoleEnum.DIRECTOR) // Solo admins, directores y supervisores pueden ver la lista
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMINISTRADOR) // Solo admins pueden editar
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.usersService.update(Number(id), updateUserDto, req.user.id, req.user.role);
  }

  @Post('create')
  @Roles(RoleEnum.ADMINISTRADOR)  // Solo los administradores pueden acceder
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    return this.usersService.create(createUserDto, req.user.id);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.registerUser(createUserDto);
  }

  @Get('audit')
  @Roles(RoleEnum.ADMINISTRADOR)  // Solo los administradores pueden acceder
  async getAudit() {
    return this.usersService.getAudit();
  }
  /*@Get('Administrador')
  @Roles('Administrador')
  getAdministradorData() {
    return { message: 'Solo accesible para administradores' };
  }

  @Get('Director')
  @Roles('Director')
  getDirectorData() {
    return { message: 'Solo accesible para directores y supervisores' };
  }

  @Get('Supervisor')
  @Roles('Supervisor', 'Director' )
  getSupervisorData() {
    return { message: 'Solo accesible para supervisores y directores' };
  }

  @Get('Jefe_Area_Sucia')
  @Roles('Jefe_Area_Sucia', 'Supervisor')
  getBroilerData() {
    return { message: 'Solo accesible para supervisores y jefes de area sucia' };
  }

  @Get('Jefe_Area_Limpia')
  @Roles('Jefe_Area_Limpia', 'Supervisor')
  getCarcassData() {
    return { message: 'Solo accesible para supervisores y jefes de area limpia' };
  }*/

  /*@Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }*/
}