import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { Beneficio } from './entities/beneficio.entity';
import { Broiler } from '../broilers/entities/broiler.entity';
import { Carcass } from '../carcasses/entities/carcass.entity';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';


@Injectable()
export class BeneficiosService {
  constructor(
    @InjectRepository(Beneficio)
    private beneficioRepository: Repository<Beneficio>,
    @InjectRepository(Broiler)
    private broilerRepository: Repository<Broiler>,
    @InjectRepository(Carcass)
    private carcassRepository: Repository<Carcass>,
  ) {}

  async actualizarBeneficio(id_remision: string, updateBeneficioDto: UpdateBeneficioDto) {
    const beneficio = await this.beneficioRepository.findOne({
      where: { broiler: { id_remision } },
    });

    if (!beneficio) {
      throw new NotFoundException(`No se encontró beneficio con id_remision ${id_remision}`);
    }

    Object.assign(beneficio, updateBeneficioDto);
    return await this.beneficioRepository.save(beneficio);
  }

  async create(createBeneficioDto: CreateBeneficioDto) {
    const broiler = await this.broilerRepository.findOne({
      where: { id_remision: createBeneficioDto.id_remision },
    });

    if (!broiler) {
      throw new NotFoundException('ID Remisión no encontrado en Área Sucia');
    }

    const carcass = await this.carcassRepository.findOne({
      where: { broiler },
    });

    if (!carcass) {
      throw new NotFoundException('ID Remisión no encontrado en Área Limpia');
    }

    const peso_hidratacion_lote = ((broiler.peso_lote_aves_planta * 0.75) + ((broiler.peso_lote_aves_planta * 0.75) * 0.14));
    const total_rendimiento_canal = ((broiler.peso_lote_aves_planta * 0.75) * broiler.aves_colgadas);
    const rendimiento_visceras_rojas = ((broiler.peso_lote_aves_planta * 0.03) * broiler.aves_colgadas);
    const rendimiento_visceras_blancas = ((broiler.peso_lote_aves_planta * 0.07) * broiler.aves_colgadas);
    const rendimiento_patas = ((broiler.peso_lote_aves_planta * 0.04) * broiler.aves_colgadas);
    const rendimiento_plumas = ((broiler.peso_lote_aves_planta * 0.6) * broiler.aves_colgadas);
    const rendimiento_sangre = ((broiler.peso_lote_aves_planta * 0.05) * broiler.aves_colgadas);
    const residuos_lodos = ((broiler.peso_lote_aves_planta * 0.05) * broiler.aves_colgadas);

    const beneficio = this.beneficioRepository.create({
      broiler,
      carcass,
      peso_hidratacion_lote,
      total_rendimiento_canal,
      rendimiento_visceras_rojas,
      rendimiento_visceras_blancas,
      rendimiento_patas,
      rendimiento_plumas,
      rendimiento_sangre,
      residuos_lodos
    });

    return await this.beneficioRepository.save(beneficio);
  }

  async findByRemision(id_remision: string) {
    return await this.beneficioRepository.findOne({
      where: { broiler: { id_remision } },
      relations: ['broiler', 'carcass'],
    });
  }

  async update(id: number, updateBeneficioDto: Partial<CreateBeneficioDto>) {
    await this.beneficioRepository.update(id, updateBeneficioDto);
    return this.beneficioRepository.findOne({ where: { id } });
  }

  async listarIdRemision(): Promise<{ id_remision: string }[]> {
    return await this.broilerRepository.find({
      select: ['id_remision'],
    });
  }


}
