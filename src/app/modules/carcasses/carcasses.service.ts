import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarcassDto } from './dto/create-carcass.dto';
import { Carcass } from './entities/carcass.entity';
import { Beneficio } from '../beneficios/entities/beneficio.entity';
import { RoleEnum } from '../../../common/enums';
import { UpdateCarcassDto } from './dto/update-carcass.dto';


@Injectable()
export class CarcassService {
  constructor(
    @InjectRepository(Carcass)
    private carcassRepository: Repository<Carcass>,
    @InjectRepository(Beneficio)
    private beneficioRepository: Repository<Beneficio>,
  ) {}

  async create(createCarcassDto: CreateCarcassDto) {
    const beneficio = await this.beneficioRepository.findOne({
      where: { id_remision: createCarcassDto.id_remision },
    });
    if (!beneficio) {
      throw new NotFoundException('ID Remisión no encontrado');
    }
    const carcass = this.carcassRepository.create({
      ...createCarcassDto,
      beneficio,
    });
    return await this.carcassRepository.insert(carcass);
  }

  async update(id: number, updateCarcassDto: UpdateCarcassDto, userRole: RoleEnum): Promise<Carcass> {
    if (userRole !== RoleEnum.SUPERVISOR) {
      throw new ForbiddenException('Solo los supervisores pueden actualizar los datos del beneficio.');
    }
    // Buscar el beneficio existente
    const carcass = await this.carcassRepository.findOne({ where: { id } });
    if (!carcass) {
      throw new NotFoundException('El registro del beneficio no existe.');
    }
    // No permitir cambiar el beneficio asociado
    if (updateCarcassDto.id_remision && updateCarcassDto.id_remision !== carcass.beneficio.id_remision) {
      throw new ForbiddenException('No se puede cambiar la id_remision del beneficio.');
    }
    Object.assign(carcass, updateCarcassDto);
    return this.carcassRepository.save(carcass);
  }
}
