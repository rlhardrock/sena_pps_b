import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broiler } from './entities/broiler.entity';
import { BroilersController} from './broilers.controller';
import { BroilersService } from './broilers.service';


@Module({
  imports: [TypeOrmModule.forFeature([Broiler])],
  controllers: [BroilersController],
  providers: [BroilersService],
})
export class BroilersModule {}
