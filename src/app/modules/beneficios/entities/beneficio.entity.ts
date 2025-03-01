import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Broiler } from '../../broilers/entities/broiler.entity';
import { Carcass } from '../../carcasses/entities/carcass.entity';


@Entity()
export class Beneficio {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Broiler, { eager: true })
  @JoinColumn({ name: 'id_remision' })
  broiler: Broiler;

  @OneToOne(() => Carcass, { nullable: false })
  @JoinColumn()
  carcass: Carcass;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  peso_hidratacion_lote: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  total_rendimiento_canal: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  rendimiento_visceras_rojas: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  rendimiento_visceras_blancas: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  rendimiento_patas: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  rendimiento_plumas: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  rendimiento_sangre: number;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  residuos_lodos: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateTotalRendimiento() {
    this.total_rendimiento_extra =
      (this.rendimiento_visceras_rojas ?? 0) +
      (this.rendimiento_visceras_blancas ?? 0) +
      (this.rendimiento_patas ?? 0) +
      (this.rendimiento_plumas ?? 0) +
      (this.rendimiento_sangre ?? 0);
  }

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  total_rendimiento_extra: number;
}

