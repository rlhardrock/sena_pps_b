import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToOne } from 'typeorm';
import { Beneficio } from '../../beneficios/entities/beneficio.entity';

@Entity()
export class Broiler {
  @PrimaryGeneratedColumn()
  id_beneficio: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha_beneficio: Date;

  @Column({unique: true})
  id_remision: string;

  @OneToOne(() => Beneficio, (beneficio) => beneficio.broiler)
  beneficio: Beneficio;

  @Column()
  id_empresa: string;

  @Column()
  region_procedencia: string;

  @Column()
  granja: string;

  @Column()
  galpon: string;

  @Column()
  linea_aves: string;

  @Column({ type: 'enum', enum: ['Macho', 'Hembra', 'Mixto'] })
  sexo: string;

  @Column({ type: 'decimal', precision: 5, scale: 3 })
  edad: number;

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  peso_promedio_ave_granja: number;

  @Column()
  placa_vehiculo: string;

  @Column()
  id_conductor: string;

  @Column()
  nombre_conductor: string;

  @Column()
  id_plan_sanitario: string;

  @Column()
  tp_profesional: string;

  @Column()
  nombre_profesional: string;

  @Column({ type: 'timestamp' })
  hora_beneficio: Date;

  @Column({ type: 'int' })
  aves_por_guacal: number;

  @Column({ type: 'int' })
  guacales_vacios: number;

  @Column({ type: 'int' })
  guacales_usados: number;

  @Column({ type: 'int' })
  guacal_extra: number;

  @Column({ type: 'int' })
  aves_remisionadas: number;

  @Column({ type: 'int' })
  aves_colgadas: number;

  @Column({ type: 'int' })
  aves_asfixiadas: number;

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  peso_1_guacal_vacio: number;

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  peso_torre_7_guacales: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculatePesoAvePlanta() {
    this.peso_promedio_ave_planta =
      (this.peso_torre_7_guacales / ( this.aves_por_guacal * 7 )) -
      (this.peso_1_guacal_vacio * 7);
  }

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  peso_promedio_ave_planta: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculatePesoLotePlanta() {
    this.peso_lote_aves_planta =
      (this.peso_promedio_ave_planta * this.aves_colgadas);
  }

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  peso_lote_aves_planta: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateDiferencial() {
    this.diferencial_peso_granja_planta =
      (this.peso_promedio_ave_granja * this.aves_colgadas) - (this.peso_promedio_ave_planta * this.aves_colgadas);
  }

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  diferencial_peso_granja_planta: number;

  @BeforeInsert()
  @BeforeUpdate()
  calculateMerma() {
    this.merma =
      (((this.peso_promedio_ave_granja * this.aves_colgadas) / (this.peso_lote_aves_planta)) * 100 );
  }

  @Column({ type: 'decimal', precision: 6, scale: 3 })
  merma: number;

}