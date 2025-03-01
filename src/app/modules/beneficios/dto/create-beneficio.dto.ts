import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBeneficioDto {
  @IsNotEmpty()
  id_remision: string;

  @IsOptional()
  @IsNumber()
  peso_hidratacion_lote: number;

  @IsOptional()
  @IsNumber()
  total_rendimiento_canal: number;

  @IsOptional()
  @IsNumber()
  rendimiento_visceras_rojas: number;

  @IsOptional()
  @IsNumber()
  rendimiento_visceras_blancas: number;

  @IsOptional()
  @IsNumber()
  rendimiento_patas: number;

  @IsOptional()
  @IsNumber()
  rendimiento_plumas: number;

  @IsOptional()
  @IsNumber()
  rendimiento_sangre: number;

  @IsOptional()
  @IsNumber()
  residuos_lodos: number;

  @IsOptional()
  @IsNumber()
  total_rendimiento_extra: number;
}
