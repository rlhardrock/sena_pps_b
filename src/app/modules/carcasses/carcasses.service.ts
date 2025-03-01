import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarcassDto } from './dto/create-carcass.dto';
import { Carcass } from './entities/carcass.entity';
import { Broiler } from '../broilers/entities/broiler.entity';


@Injectable()
export class CarcassService {
  constructor(
    @InjectRepository(Carcass)
    private carcassRepository: Repository<Carcass>,
    @InjectRepository(Broiler)
    private broilerRepository: Repository<Broiler>,
  ) {}

  async create(createCarcassDto: CreateCarcassDto) {
    const broiler = await this.broilerRepository.findOne({
      where: { id_remision: createCarcassDto.id_remision },
    });

    if (!broiler) {
      throw new NotFoundException('ID Remisión no encontrado');
    }

    const carcass = this.carcassRepository.create({
      ...createCarcassDto,
      broiler,
    });

    return await this.carcassRepository.save(carcass);
  }
}
