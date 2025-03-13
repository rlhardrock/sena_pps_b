import {
  Controller, Post, Get, Patch, Body, Param, Query, ParseIntPipe
} from '@nestjs/common';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { BeneficiosService } from './beneficios.service';
import { Beneficio } from './entities/beneficio.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Beneficio')
@ApiBearerAuth()
@Controller('beneficio')
export class BeneficiosController {
  constructor(private readonly beneficiosService: BeneficiosService) { }

  // Crear un beneficio
  @Post()
  /*@Roles(RoleEnum.JEFE_AREA_SUCIA, RoleEnum.SUPERVISOR)*/
  async crearBeneficio(@Body() createBeneficioDto: CreateBeneficioDto) {
    return this.beneficiosService.crearBeneficio(createBeneficioDto);
  }

  // Listar todos los id_remision disponibles.
  @Get('remisiones')
  /*@Roles(RoleEnum.SUPERVISOR)*/
  async listarTodasLasRemisiones() {
    return this.beneficiosService.listarTodasLasRemisiones();
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: Beneficio[]; total: number; page: number; lastPage: number }> {
    const [data, total] = await this.beneficiosService.findAllPaginated(page, limit);
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // Listar id_remision de una empresa específica.
  @Get('empresas')
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

