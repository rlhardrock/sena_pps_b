import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersModule } from './app/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './app/modules/users/entities/user.entity';
import { BeneficiosModule } from './app/modules/beneficios/beneficios.module';
import { Beneficio } from './app/modules/beneficios/entities/beneficio.entity';
import { AuthModule } from './app/modules/auth/auth.module';
import { RolesGuard } from './app/modules/auth/roles.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Beneficio],
    }),
    UsersModule,
    BeneficiosModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  exports: [],
})
export class AppModule {}
