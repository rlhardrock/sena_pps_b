import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { RoleEnum } from '../../../common/enums';
import { Request } from 'express';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // Si no hay roles definidos, permite el acceso
    }
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User; // Cast explícito para asegurar que tiene la estructura correcta
    if (!user || !user.role) {
      throw new ForbiddenException('Usuario no autenticado o sin rol asignado');
    }
    const hasRole = requiredRoles.includes(user.role); // Comparamos directamente
    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos para acceder a este recurso');
    }
    return true;
  }
}
