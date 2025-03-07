import { IsEmail, IsOptional, MinLength, IsEnum, MaxLength, Matches, IsString } from 'class-validator';
import { EstadoEnum, RoleEnum } from '../../../../common/enums';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {

  @ApiPropertyOptional({ example: 'nuevo sena', description: 'nombre actualizado' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ example: 'nuevo email', description: 'email actualizado' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: 'newpassword123!', description: 'Nueva contraseña', minLength: 6 })
  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  /*@Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]){2,}.*$/, {
    message: 'La contraseña debe contener al menos dos carácter especial ( @ # $ % & * ? )',
  })*/
  password?: string;

  @ApiPropertyOptional({ example: RoleEnum.ADMINISTRADOR, enum: RoleEnum, description: 'Rol del usuario' })
  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @ApiPropertyOptional({ example: EstadoEnum.HABILITADO, enum: EstadoEnum, description: 'Estado del usuario' })
  @IsOptional()
  @IsEnum(EstadoEnum)
  estado?: EstadoEnum;
}
