import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carcass } from './entities/carcass.entity';
import { Broiler } from '../broilers/entities/broiler.entity';
import { CarcassController } from './carcasses.controller';
import { CarcassService } from './carcasses.service';


@Module({
  imports: [TypeOrmModule.forFeature([Carcass, Broiler])],
  controllers: [CarcassController],
  providers: [CarcassService],
})
export class CarcassesModule {}
