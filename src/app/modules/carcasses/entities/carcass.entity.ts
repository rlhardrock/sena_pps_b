import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Beneficio } from '../../beneficios/entities/beneficio.entity';

@Entity()
export class Carcass {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Beneficio, { nullable: false })
  beneficio: Beneficio;

  @Column({ type: 'int' })
  canales_decomisadas: number;

  @Column({ type: 'int' })
  canales_destrozadas: number;

}
