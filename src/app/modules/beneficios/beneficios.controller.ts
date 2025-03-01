import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { BeneficiosService } from './beneficios.service';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

@Controller('beneficio')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BeneficiosController {
  constructor(private readonly beneficioService: BeneficiosService) {}

  @Post()
  @Roles('Supervisor')
  async create(@Body() createBeneficioDto: CreateBeneficioDto) {
    return await this.beneficioService.create(createBeneficioDto);
  }

  @Get(':id_remision')
  @Roles('Supervisor')
  async findByRemision(@Param('id_remision') id_remision: string) {
    return await this.beneficioService.findByRemision(id_remision);
  }

  @Get('listar-id-remision')
  @Roles('Supervisor')
  async listarIdRemision() {
    return this.beneficioService.listarIdRemision();
  }
  @Patch(':id')
  @Roles('Supervisor')
  async update(@Param('id') id: number, @Body() updateBeneficioDto: Partial<CreateBeneficioDto>) {
    return await this.beneficioService.update(id, updateBeneficioDto);
  }

  @Patch('actualizar/:id_remision')
  @Roles('Supervisor')
  async actualizarBeneficio(
    @Param('id_remision') id_remision: string,
    @Body() updateBeneficioDto: UpdateBeneficioDto,
  ) {
    return this.beneficioService.actualizarBeneficio(id_remision, updateBeneficioDto);
  }
}
