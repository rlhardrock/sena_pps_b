import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBroilerDto {
  @IsString()
  @IsNotEmpty()
  id_remision: string;

  @IsString()
  id_empresa: string;

  @IsString()
  region_procedencia: string;

  @IsString()
  granja: string;

  @IsString()
  galpon: string;

  @IsString()
  linea_aves: string;

  @IsString()
  sexo: string;

  @IsNumber()
  edad: number;

  @IsNumber()
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
  id_plan_sanitario: string;

  @IsString()
  @IsNotEmpty()
  tp_profesional: string;

  @IsString()
  @IsNotEmpty()
  nombre_profesional: string;

  @IsNumber()
  @IsNotEmpty()
  aves_por_guacal: number;

  @IsNumber()
  @IsNotEmpty()
  guacales_vacios: number;

  @IsNumber()
  @IsNotEmpty()
  guacales_usados: number;

  @IsNumber()
  @IsNotEmpty()
  guacal_extra: number;

  @IsNumber()
  @IsNotEmpty()
  aves_remisionadas: number;

  @IsNumber()
  @IsNotEmpty()
  aves_colgadas: number;

  @IsNumber()
  @IsNotEmpty()
  aves_asfixiadas: number;

  @IsNumber()
  @IsNotEmpty()
  peso_1_guacal_vacio: number;

  @IsNumber()
  @IsNotEmpty()
  peso_torre_7_guacales: number;

}
