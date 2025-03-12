import { IsDate, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBeneficioDto {
  @IsString()
  @IsNotEmpty()
  id_remision: string;

  @IsString()
  @IsNotEmpty()
  id_empresa: string;

  @IsString()
  @IsNotEmpty()
  region_procedencia: string;

  @IsString()
  @IsNotEmpty()
  granja: string;

  @IsString()
  @IsNotEmpty()
  galpon: string;

  @IsString()
  @IsNotEmpty()
  linea_aves: string;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsInt()
  @Min(1)
  @Max(50)
  @IsNotEmpty()
  edad: number;

  @IsInt()
  @IsNotEmpty()
  peso_promedio_ave_granja: number;

  @IsString()
  @IsNotEmpty()
  placa_vehiculo: string;

  @IsString()
  @IsNotEmpty()
  id_conductor: string;

  @IsString()
  @IsNotEmpty()
  nombre_conductor: string;

  @IsString()
  @IsNotEmpty()
  id_plan_sanitario: string;

  @IsString()
  @IsNotEmpty()
  tp_profesional_granja: string;

  @IsString()
  @IsNotEmpty()
  nombre_profesional: string;

  @IsString()
  @IsNotEmpty()
  tp_profesional_planta: string;

  @IsString()
  @IsNotEmpty()
  nombre_auditor: string;

  @IsDate()
  @Type(() => Date)
  hora_beneficio: Date;

  @IsInt()
  @IsNotEmpty()
  aves_por_guacal: number;

  @IsInt()
  @IsNotEmpty()
  guacales_vacios: number;

  @IsInt()
  @IsNotEmpty()
  guacales_usados: number;

  @IsInt()
  @IsNotEmpty()
  guacal_extra: number;

  @IsInt()
  @IsNotEmpty()
  aves_remisionadas: number;

  @IsInt()
  @IsNotEmpty()
  aves_colgadas: number;

  @IsInt()
  @IsNotEmpty()
  aves_asfixiadas: number;

  @IsInt()
  @IsNotEmpty()
  aves_en_guacal_extra: number;

  @IsInt()
  @IsNotEmpty()
  aves_asfixiadas: number;

  @IsInt()
  @IsNotEmpty()
  aves_en_guacal_extra: number;

  @IsInt()
  @IsNotEmpty()
  peso_1_guacal_vacio: number;

  @IsInt()
  @IsNotEmpty()
  peso_torre_7_guacales: number;

}
