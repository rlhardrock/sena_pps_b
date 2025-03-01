import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BroilersService } from './broilers.service';
import { CreateBroilerDto } from './dto/create-broiler.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../../../common/enums';


@Controller('broilers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BroilersController {
  constructor(private readonly broilersService: BroilersService) {}

  @Post('register')
  @Roles(RoleEnum.JEFE_AREA_SUCIA) // Solo este rol puede acceder
  async registerBroiler(@Body() createBroilerDto: CreateBroilerDto, @Request() req) {
    return await this.broilersService.create(createBroilerDto);
  }
}
