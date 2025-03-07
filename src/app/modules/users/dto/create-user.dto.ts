import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { EstadoEnum, RoleEnum } from '../../../../common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ example: 'sena', description: 'Correo del usuario' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'sena@sena.com', description: 'Correo del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!', description: 'Contraseña del usuario', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  /*@Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]){2,}.*$/, {
    message: 'La contraseña debe contener al menos dos carácter especial ( @ # $ % & * ? )',
  })*/
  password: string;

  @ApiProperty({ example: RoleEnum.ADMINISTRADOR, enum: RoleEnum, description: 'Rol del usuario' })
  @IsEnum(RoleEnum)
  role: RoleEnum;

  @ApiProperty({ example: EstadoEnum.HABILITADO, enum: EstadoEnum, description: 'Estado del usuario' })
  @IsEnum(EstadoEnum)
  estado: EstadoEnum;
}
