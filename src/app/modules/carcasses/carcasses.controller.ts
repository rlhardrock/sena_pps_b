import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateCarcassDto } from './dto/create-carcass.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CarcassService } from './carcasses.service';
import { RoleEnum } from '../../../common/enums';

@Controller('carcass')
/*@UseGuards(JwtAuthGuard, RolesGuard)*/
@UseGuards(RolesGuard)
export class CarcassController {
  constructor(private readonly carcassService: CarcassService) {}

  @Post()
  /*@Roles(RoleEnum.JEFE_AREA_LIMPIA, RoleEnum.SUPERVISOR)*/ // Solo este rol puede acceder*/
  async create(@Body() createCarcassDto: CreateCarcassDto) {
    return await this.carcassService.create(createCarcassDto);
  }
}
