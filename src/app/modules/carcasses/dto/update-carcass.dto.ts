import { PartialType } from '@nestjs/mapped-types';
import { CreateCarcassDto } from './create-carcass.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateCarcassDto extends PartialType(CreateCarcassDto) {
  @IsOptional()
  id_remision?: never; // Evita que se pueda cambiar la relación con Beneficio

  @IsOptional()
  @IsInt()
  canales_decomisadas?: number;

  @IsOptional()
  @IsInt()
  canales_destrozadas?: number;
}
