import { IsEmail, IsOptional, MinLength, IsEnum, MaxLength, Matches } from 'class-validator';
import { RoleEnum } from '../../../../common/enums';


export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(15)
  @Matches(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]){2,}.*$/, {
    message: 'La contraseña debe contener al menos dos carácter especial ( @ # $ % & * ? )',
  })
  password?: string;

  @IsOptional()
  @IsEnum(RoleEnum)
  role?: RoleEnum;
}
