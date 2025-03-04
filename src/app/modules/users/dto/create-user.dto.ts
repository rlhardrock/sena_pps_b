import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { EstadoEnum, RoleEnum } from '../../../../common/enums';
import { Type } from 'class-transformer';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  @Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]){2,}.*$/, {
    message: 'La contraseña debe contener al menos dos carácter especial ( @ # $ % & * ? )',
  })
  password: string;

  @IsDate()
  @Type(() => Date)
  hora_beneficio: Date;

  @IsEnum(RoleEnum)
  role: RoleEnum;

  @IsEnum(EstadoEnum)
  estado: EstadoEnum;
}
