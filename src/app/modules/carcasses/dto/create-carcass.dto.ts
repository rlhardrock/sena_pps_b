import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarcassDto {
  @IsString()
  @IsNotEmpty()
  id_remision: string;

  @IsInt()
  @IsNotEmpty()
  canales_decomisadas: number;

  @IsInt()
  @IsNotEmpty()
  canales_destrozadas: number;

}
