import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { RoleEnum } from 'src/common/enums';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleEnum })
  rol: RoleEnum;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
