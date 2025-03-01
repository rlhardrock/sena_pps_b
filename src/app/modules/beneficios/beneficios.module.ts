import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeneficiosController } from './beneficios.controller';
import { Beneficio } from './entities/beneficio.entity';
import { Broiler } from '../broilers/entities/broiler.entity';
import { Carcass } from '../carcasses/entities/carcass.entity';
import { BeneficiosService } from './beneficios.service';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficio, Broiler, Carcass])],
  controllers: [BeneficiosController],
  providers: [BeneficiosService],
})
export class BeneficiosModule {}
