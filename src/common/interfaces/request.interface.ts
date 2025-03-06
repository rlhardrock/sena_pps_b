import { RoleEnum } from '../enums/role.enum';

export interface RequestUser {
  id: number;
  email: string;
  role: RoleEnum;
}
