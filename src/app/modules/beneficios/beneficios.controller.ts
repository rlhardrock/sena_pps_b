import {
  Controller, Post, Get, Patch, Body, Param, Query, ParseIntPipe
} from '@nestjs/common';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { BeneficiosService } from './beneficios.service';
import { RoleEnum } from '../../../common/enums';
import { Roles } from '../auth/roles.decorator';

@Controller('beneficio')
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) {}

  // Crear un beneficio
  @Post()
  /*@Roles(RoleEnum.JEFE_AREA_SUCIA)*/
  async crearBeneficio(@Body() createBeneficioDto: CreateBeneficioDto) {
    return this.beneficiosService.crearBeneficio(createBeneficioDto);
  }

  // Listar todos los id_remision disponibles.
  @Get('listar-remisiones')
  /*@Roles(RoleEnum.SUPERVISOR)*/
  async listarTodasLasRemisiones() {
    return this.beneficiosService.listarTodasLasRemisiones();
  }

  // Listar id_remision de una empresa específica.
  @Get('listar-remisiones-empresa')
  /*@Roles(RoleEnum.SUPERVISOR)*/
  async listarRemisionesPorEmpresa(@Query('id_empresa') id_empresa: string) {
    return this.beneficiosService.listarRemisionesPorEmpresa(id_empresa);
  }

  //Buscar un broiler por id_remision.
  @Get(':id_remision')
  /*@Roles(RoleEnum.SUPERVISOR)*/
  async buscarPorRemision(@Param('id_remision') id_remision: string) {
    return this.beneficiosService.buscarPorRemision(id_remision);
  }

  // Editar un broiler por id_remision.
  @Patch(':id_remision')
  /*@Roles(RoleEnum.SUPERVISOR)*/
  async actualizarPorRemision(
    @Param('id_remision') id_remision: string,
    @Body() updateBeneficioDto: UpdateBeneficioDto,
  ) {
    return this.beneficiosService.actualizarPorRemision(id_remision, updateBeneficioDto);
  }
}

