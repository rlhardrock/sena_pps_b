import { PartialType } from '@nestjs/mapped-types';
import { CreateBeneficioDto } from './create-beneficio.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBeneficioDto extends PartialType(CreateBeneficioDto) {
  @IsNotEmpty()
  @IsString()
  id_remision: string; // Se debe enviar la ID de la remisión a actualizar

  @IsOptional()
  nuevo_campo_1?: string; // Campos adicionales que puede editar el supervisor

  @IsOptional()
  nuevo_campo_2?: number;
}
