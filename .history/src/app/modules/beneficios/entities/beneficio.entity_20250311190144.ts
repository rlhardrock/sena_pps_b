import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm';
import { Carcass } from '../../carcasses/entities/carcass.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Beneficio {
  @PrimaryGeneratedColumn()
  id_beneficio: number;

  @OneToMany(() => Carcass, (carcass) => carcass.beneficio)
  carcasses: Carcass[];

  @ApiProperty({ example: 'REM123456', description: 'ID de la remisión' })
  @Column({ unique: true })
  id_remision: string;

  @ApiProperty({ example: 'Rassiya', description: 'Empresa Remitente del viaje' })
  @Column()
  id_empresa: string;

  @ApiProperty({ example: 'Danbass', description: 'Origen de la remision de los animales' })
  @Column()
  region_procedencia: string;

  @ApiProperty({ example: 'Danietsk', description: 'Nombre mas especifico' })
  @Column()
  granja: string;

  @ApiProperty({ example: 'Kramatorsk', description: 'Nombre mas especifico' })
  @Column()
  galpon: string;

  @ApiProperty({ example: 'Cisgnus-478', description: 'Linea genetica de las aves' })
  @Column()
  linea_aves: string;

  @ApiProperty({ example: 'Mixto', description: 'Sexo de las aves' })
  @Column({ type: 'enum', enum: ['Macho', 'Hembra', 'Mixto'] })
  sexo: string;

  @ApiProperty({ example: '35', description: 'Edad de las aves' })
  @Column({ type: 'int' })
  edad: number;

  @ApiProperty({ example: '1950', description: 'Peso del ave en gramos' })
  @Column({ type: 'int' })
  peso_promedio_ave_granja: number;

  @ApiProperty({ example: 'COL-1234-ASDF', description: 'Matricula del Camion transportador' })
  @Column()
  placa_vehiculo: string;

  @ApiProperty({ example: 'Klauss Meine', description: 'Nombre del transportador' })
  @Column()
  id_conductor: string;

  @ApiProperty({ example: '98321852', description: 'ID del Conductor' })
  @Column()
  nombre_conductor: string;

  @ApiProperty({ example: 'PS-4587-INVIMA-2025', description: 'Plan Sanitario de la Remision' })
  @Column()
  id_plan_sanitario: string;

  @ApiProperty({ example: '101110011', description: 'Tarjeta Profesional de la Remision' })
  @Column()
  tp_profesional_granja: string;

  @ApiProperty({ example: '101110011', description: 'Nombre Profesional de la Remision' })
  @Column()
  nombre_profesional: string;

  @ApiProperty({ example: '101110011', description: 'Tarjeta Profesional del Auditor del Beneficio' })
  @Column()
  tp_profesional_planta: string;

  @ApiProperty({ example: '2022202020', description: 'Tarjeta Profesional del Auditor' })
  @Column()
  nombre_auditor: string;
  @ApiProperty({ example: '2025/06/15::22:34', description: 'Tarjeta Profesional de la Remision' })
  @Column({ type: 'timestamp', precision: 0 })
  hora_beneficio: Date;

  @ApiProperty({ example: '7', description: 'Aves' })
  @Column({ type: 'int' })
  aves_por_guacal: number;

  @ApiProperty({ example: '7', description: 'Aves' })
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

  @Column({ type: 'int' })
  peso_1_guacal_vacio: number;

  @Column({ type: 'int' })
  peso_torre_7_guacales: number;

  /* 
   @Column({ type: 'int' })
   aves_en_guacal_extra: number;
  
   @BeforeInsert()
   @BeforeUpdate()
   calculatePesoAvePlanta() {
     this.peso_promedio_ave_planta =
       (this.peso_torre_7_guacales / ( this.aves_por_guacal * 7 )) -
       (this.peso_1_guacal_vacio * 7);
   }
 
   @Column({ type: 'int' })
   peso_promedio_ave_planta: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   calculatePesoLotePlanta() {
     this.peso_lote_aves_planta =
       ((this.peso_promedio_ave_planta * this.aves_colgadas)/1000);
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0 })
   peso_lote_aves_planta: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   calculateDiferencial() {
     this.diferencial_peso_granja_planta =
       (this.peso_promedio_ave_granja * this.aves_colgadas) - (this.peso_promedio_ave_planta * this.aves_colgadas);
   }
 
   @Column({ type: 'int' })
   diferencial_peso_granja_planta: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   calculateMerma() {
     this.indiceMerma =
       (((this.peso_promedio_ave_granja * this.aves_colgadas) / (this.peso_lote_aves_planta)) * 100 );
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0  })
   indiceMerma: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   calculateRendimientoCanal() {
     this.peso_total_rendimiento_canal =
       (((this.peso_promedio_ave_planta * this.aves_colgadas) * 0.75 )/1000);
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0  })
   peso_total_rendimiento_canal: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   calculateHidratacionFinalCanal() {
     this.peso_hidratacion_lote =
       ((this.peso_total_rendimiento_canal + (this.peso_total_rendimiento_canal * 0.14))/1000);
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0  })
   peso_hidratacion_lote: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   rendimientoViscerasRojas() {
     this.peso_rendimiento_visceras_rojas =
       ((this.peso_lote_aves_planta + (this.peso_lote_aves_planta * 0.07))/1000);
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0  })
   peso_rendimiento_visceras_rojas: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   rendimientoViscerasBlancas() {
     this.peso_rendimiento_visceras_blancas =
       ((this.peso_lote_aves_planta + (this.peso_lote_aves_planta * 0.05))/1000);
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0  })
   peso_rendimiento_visceras_blancas: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   rendimientoSangrePatasCabeza() {
     this.peso_rendimiento_sangre_patas_cabezas =
       ((this.peso_lote_aves_planta + (this.peso_lote_aves_planta * 0.03))/1000);
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0  })
   peso_rendimiento_sangre_patas_cabezas: number;
 
   @BeforeInsert()
   @BeforeUpdate()
   calculateTotalRendimiento() {
     this.total_rendimiento_extra =
       ((this.peso_rendimiento_visceras_rojas ?? 0) +
       (this.peso_rendimiento_visceras_blancas ?? 0) +
       ((this.peso_rendimiento_sangre_patas_cabezas ?? 0) * 3) / 1000 )
   }
 
   @Column({ type: 'decimal', precision: 6, scale: 0  })
   total_rendimiento_extra: number;*/

}