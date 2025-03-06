import { IsEmail, IsOptional, MinLength, IsEnum, MaxLength, Matches, IsString } from 'class-validator';
import { EstadoEnum, RoleEnum } from '../../../../common/enums';

export class UpdateUserDto {

  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  /*@Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]){2,}.*$/, {
    message: 'La contraseña debe contener al menos dos carácter especial ( @ # $ % & * ? )',
  })*/
  password?: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;

  @IsOptional()
  @IsEnum(EstadoEnum)
  estado?: EstadoEnum;
}
