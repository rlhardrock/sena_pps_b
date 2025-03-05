import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('avi'); // Prefijo global para las rutas

  app.use(helmet()); // Seguridad con Helmet

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades desconocidas
      transform: false, // Convierte automáticamente los tipos de datos (ej: string a number)
    })
  );

  app.enableCors(); // Habilitar CORS para que el frontend pueda comunicarse con el backend

  const port = process.env.PORT ?? 3000; // Definir el puerto, usando 3000 por defecto
  await app.listen(port);
  console.warn(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
