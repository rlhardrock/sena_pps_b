import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBeneficioDto {
  @IsOptional()
  @IsString()
  id_remision?: string;

  @IsOptional()
  @IsString()
  id_empresa?: string;

  @IsOptional()
  @IsString()
  region_procedencia?: string;

  @IsOptional()
  @IsString()
  granja?: string;

  @IsOptional()
  @IsString()
  galpon?: string;

  @IsOptional()
  @IsString()
  linea_aves?: string;

  @IsOptional()
  @IsString()
  sexo?: string;

  @IsOptional()
  @IsInt()
  edad?: number;

  @IsOptional()
  @IsInt()
  peso_promedio_ave_granja?: number;

  @IsOptional()
  @IsString()
  placa_vehiculo?: string;

  @IsOptional()
  @IsString()
  id_conductor?: string;

  @IsOptional()
  @IsString()
  nombre_conductor?: string;

  @IsOptional()
  @IsString()
  id_plan_sanitario?: string;

  @IsOptional()
  @IsString()
  tp_profesional_granja?: string;

  @IsOptional()
  @IsString()
  nombre_profesional?: string;

  @IsOptional()
  @IsString()
  tp_profesional_planta?: string;

  @IsOptional()
  @IsString()
  nombre_auditor?: string;

  @IsOptional()
  @IsInt()
  aves_por_guacal?: number;

  @IsOptional()
  @IsInt()
  guacales_vacios?: number;

  @IsOptional()
  @IsInt()
  guacales_usados?: number;

  @IsOptional()
  @IsInt()
  guacal_extra?: number;

  @IsOptional()
  @IsInt()
  aves_remisionadas?: number;

  @IsOptional()
  @IsInt()
  aves_en guacal_extra?: number;

  @IsOptional()
  @IsInt()
  aves_colgadas?: number;

  @IsOptional()
  @IsInt()
  aves_asfixiadas?: number;

  @IsOptional()
  @IsInt()
  peso_1_guacal_vacio?: number;

  @IsOptional()
  @IsInt()
  peso_torre_7_guacales?: number;
}
