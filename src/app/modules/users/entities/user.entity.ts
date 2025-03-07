import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { EstadoEnum, RoleEnum } from '../../../../common/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  fecha_inscripcion: Date;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.MODERADOR })
  role: RoleEnum;

  @Column({ type: 'enum', enum: EstadoEnum, default: EstadoEnum.INDEFINIDO })
  estado: EstadoEnum;

  @ManyToOne(() => User, (user) => user.createdUser, { nullable: true })
  createdBy: User;

  @OneToMany(() => User, (user) => user.createdBy)
  createdUser: User[];

  @CreateDateColumn()
  createdAt: Date;
}
