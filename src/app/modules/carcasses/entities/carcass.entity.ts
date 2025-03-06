import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Beneficio } from '../../beneficios/entities/beneficio.entity';

@Entity()
export class Carcass {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Beneficio, { nullable: false })
  @JoinColumn({ name: 'id_remision' }) // Relaciona con el campo id_remision de Beneficio
  beneficio: Beneficio;

  @Column({ type: 'int' })
  canales_decomisadas: number;

  @Column({ type: 'int' })
  canales_destrozadas: number;

}
