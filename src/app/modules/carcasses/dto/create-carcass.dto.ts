import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

}
