import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PulmonEnum } from '../../../../common/enums';

export class CreateCarcassDto {
  @IsString()
  @IsNotEmpty()
  id_remision: string;

  @IsNumber()
  @IsNotEmpty()
  canales_decomisadas: number;

  @IsNumber()
  @IsNotEmpty()
  canales_destrozadas: number;

  @IsEnum(PulmonEnum)
  despulmonado: PulmonEnum;
}
