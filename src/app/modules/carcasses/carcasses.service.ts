import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarcassDto } from './dto/create-carcass.dto';
import { Carcass } from './entities/carcass.entity';
import { Beneficio } from '../beneficios/entities/beneficio.entity';


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

    return await this.carcassRepository.save(carcass);
  }
}
