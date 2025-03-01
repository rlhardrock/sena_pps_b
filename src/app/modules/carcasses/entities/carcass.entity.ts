import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Broiler } from '../../broilers/entities/broiler.entity';
import { PulmonEnum } from '../../../../common/enums';

@Entity()
export class Carcass {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Broiler, { nullable: false })
  broiler: Broiler;

  @Column({ type: 'int' })
  canales_decomisadas: number;

  @Column({ type: 'int' })
  canales_destrozadas: number;

  @Column({ type: 'enum', enum: PulmonEnum })
  despulmonado: PulmonEnum;
}
