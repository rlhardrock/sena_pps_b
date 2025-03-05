import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carcass } from './entities/carcass.entity';
import { Beneficio } from '../beneficios/entities/beneficio.entity';
import { CarcassController } from './carcasses.controller';
import { CarcassService } from './carcasses.service';


@Module({
  imports: [TypeOrmModule.forFeature([Carcass, Beneficio])],
  controllers: [CarcassController],
  providers: [CarcassService],
})
export class CarcassesModule {}
