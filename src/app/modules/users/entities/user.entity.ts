import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { EstadoEnum, RoleEnum } from '../../../../common/enums';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', precision: 0 })
  fecha_inscripcion: Date;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.MODERADOR })
  role: RoleEnum;

  @Column({ type: 'enum', enum: EstadoEnum, default: EstadoEnum.INDEFINIDO })
  estado: EstadoEnum;

  @ManyToOne(() => User, (user) => user.createdUser, { nullable: true })
  @Transform(({ value }) => value ? { id: value.id, email: value.email } : null)
  createdBy: User;

  @OneToMany(() => User, (user) => user.createdBy)
  @Transform(({ value }) => value ? value.map(u => ({ id: u.id, email: u.email })) : [])
  createdUser: User[];

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
