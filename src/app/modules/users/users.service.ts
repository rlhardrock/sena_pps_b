import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { RoleEnum } from '../../../common/enums';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  // Buscar usuario por correo
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // Listar usuarios por rol
  async findByRole(role: RoleEnum): Promise<User[]> {
    return this.usersRepository.find({
      where: { role },
      select: ['id', 'nombre', 'email', 'role', 'estado'],
    });
  }

  // Listar todos los usuarios (solo ID, email y rol)
  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ select: ['id', 'email', 'role'] });
  }

  // Crear usuario (solo un administrador puede hacerlo)
  async create(createUserDto: CreateUserDto, adminId: number): Promise<User> {
    const adminUser = await this.usersRepository.findOne({ where: { id: adminId } });
    if (!adminUser || adminUser.role !== RoleEnum.ADMINISTRADOR) {
      throw new ForbiddenException('Solo los administradores pueden crear nuevos usuarios');
    }
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  /*async create(createUserDto: CreateUserDto, adminId: number): Promise<User> {
    const adminUser = await this.usersRepository.findOne({ where: { id: adminId } });
    if (!adminUser || adminUser.role !== RoleEnum.ADMINISTRADOR) {
      throw new ForbiddenException('Solo los administradores pueden crear nuevos usuarios');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      createdBy: adminUser, // Guardamos quién lo creó
    });
    return this.usersRepository.save(user);
  }*/

  // ✅ Actualizar usuario (solo un administrador)
  async update(id: number, updateUserDto: UpdateUserDto, adminId: number, adminRole: RoleEnum): Promise<User> {
    if (adminRole !== RoleEnum.ADMINISTRADOR) {
      throw new ForbiddenException('Solo los administradores pueden actualizar información de los usuarios');
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (id === adminId && updateUserDto.role) {
      throw new ForbiddenException('Los administradores no pueden cambiar su propio rol');
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  /*async update(id: number, updateUserDto: UpdateUserDto, adminId: number, adminRole: RoleEnum): Promise<User> {
    if (adminRole !== RoleEnum.ADMINISTRADOR) {
      throw new ForbiddenException('Solo los administradores pueden actualizar información de los usuarios');
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    // Un admin no puede cambiar su propio rol
    if (id === adminId && updateUserDto.role) {
      throw new ForbiddenException('Los Administradores no pueden cambiar su propio rol');
    }
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }*/

  async getAudit(): Promise<any> {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.createdBy', 'administrador')
      .select([
        'administrador.email AS "createdBy"',
        'user.email AS "userCreated"',
        'user.createdAt AS "createdAt"',
      ])
      .orderBy('user.createdAt', 'DESC')
      .getRawMany();
  }

  /*// Nuevo
  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }*/

}