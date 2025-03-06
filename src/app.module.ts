import { Module } from '@nestjs/common';
import { UsersModule } from './app/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './app/modules/users/entities/user.entity';
import { BeneficiosModule } from './app/modules/beneficios/beneficios.module';
import { CarcassesModule } from './app/modules/carcasses/carcasses.module';
import { Beneficio } from './app/modules/beneficios/entities/beneficio.entity';
import { Carcass } from './app/modules/carcasses/entities/carcass.entity';
import { AuthModule } from './app/modules/auth/auth.module';
import { RolesGuard } from './app/modules/auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite acceso en toda la app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      /*port: Number(process.env.DATABASE_PORT),*/
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo, en producción usar migrations
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      entities: [User, Beneficio, Carcass]
    }),
    UsersModule,
    BeneficiosModule,
    CarcassesModule,
    AuthModule
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
  exports: []
})
export class AppModule {}
