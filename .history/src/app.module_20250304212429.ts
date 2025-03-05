import { Module } from '@nestjs/common';
import { UsersModule } from './app/modules/users/users.module';
import { RolesModule } from './app/modules/roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './app/modules/users/entities/user.entity';
import { Role } from './app/modules/roles/entities/role.entity';
import { BroilersModule } from './app/modules/broilers/broilers.module';
import { CarcassesModule } from './app/modules/carcasses/carcasses.module';
import { Broiler } from './app/modules/broilers/entities/broiler.entity';
import { Carcass } from './app/modules/carcasses/entities/carcass.entity';
import { AuthModule } from './app/modules/auth/auth.module';
import { BeneficiosModule } from './app/modules/beneficios/beneficios.module';
import { Beneficio } from './app/modules/beneficios/entities/beneficio.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permite acceso en toda la app
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      /* url: process.env.DATABASE_URL, */
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Solo para desarrollo, en producción usar migrations
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
      entities: [User, Role, Broiler, Carcass, Beneficio]
    }),
    UsersModule,
    RolesModule,
    BroilersModule,
    CarcassesModule,
    AuthModule,
    BeneficiosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
