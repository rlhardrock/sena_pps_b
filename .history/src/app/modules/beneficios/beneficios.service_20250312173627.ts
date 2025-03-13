import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beneficio } from './entities/beneficio.entity';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';

@Injectable()
export class BeneficiosService {
  constructor(
    @InjectRepository(Beneficio)
    private readonly beneficioRepository: Repository<Beneficio>,
  ) { }

  async crearBeneficio(createBeneficioDto: CreateBeneficioDto): Promise<Beneficio> {
    const fechaOriginal = new Date(createBeneficioDto.hora_beneficio);
    fechaOriginal.setSeconds(0, 0); // Eliminar segundos y milisegundos
    const nuevoBeneficio = this.beneficioRepository.create({
      ...createBeneficioDto,
      hora_beneficio: fechaOriginal,
    });
    return this.beneficioRepository.save(nuevoBeneficio);
  }

  // Listar todos los id_remision disponibles.
  async listarTodasLasRemisiones(): Promise<{ id_remision: string }[]> {
    return this.beneficioRepository.find({
      select: ['id_remision']
    });
  }

  async findAllPaginated(page: number, limit: number): Promise<[Beneficio[], number]> {
    return this.beneficioRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      order: { id_beneficio: 'DESC' },
    });
  }

  async findAll(): Promise<Beneficio[]> {
    return this.beneficioRepository.find();
  }


  // Listar todos los id_remision de una empresa específica.
  async listarRemisionesPorEmpresa(id_empresa: string): Promise<{ id_remision: string }[]> {
    return this.beneficioRepository.find({
      where: { id_empresa },
      select: Object.keys(this.beneficioRepository.metadata.propertiesMap) as (keyof Beneficio)[]
    });
  }

  async listarTodosLosBeneficios(): Promise<Beneficio[]> {
    return this.beneficioRepository.find();
  }

  // Buscar un beneficio broiler por id_remision.
  async buscarPorRemision(id_remision: string): Promise<Beneficio> {
    const beneficio = await this.beneficioRepository.findOne({
      where: { id_remision },
      select: Object.keys(this.beneficioRepository.metadata.propertiesMap) as (keyof Beneficio)[]
    });
    if (!beneficio) {
      throw new NotFoundException('No se encontró la remisión');
    }

    return beneficio;
  }

  // Editar un beneficio broiler por id_remision (Supervisor).
  async actualizarPorRemision(id_remision: string, updateBeneficioDto: UpdateBeneficioDto): Promise<Beneficio> {
    const beneficio = await this.beneficioRepository.findOne({ where: { id_remision } });

    if (!beneficio) {
      throw new NotFoundException(`No se encontró beneficio con id_remision ${id_remision}`);
    }

    await this.beneficioRepository.update({ id_remision }, updateBeneficioDto);

    const beneficioActualizado = await this.beneficioRepository.findOne({ where: { id_remision } });

    if (!beneficioActualizado) {
      throw new InternalServerErrorException(`Error al actualizar el beneficio con id_remision ${id_remision}`);
    }
    return beneficioActualizado;
  }

}
