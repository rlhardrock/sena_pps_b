import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficio } from './entities/beneficio.entity';
import { BeneficiosController} from './beneficios.controller';
import { BeneficiosService } from './beneficios.service';


@Module({
  imports: [TypeOrmModule.forFeature([Beneficio])],
  controllers: [BeneficiosController],
  providers: [BeneficiosService],
})
export class BeneficiosModule {}
