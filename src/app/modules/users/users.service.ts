import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleEnum } from '../../../common/enums';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Buscar usuario por correo
  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { email },
      select: ['id', 'nombre', 'email', 'fecha_inscripcion', 'role', 'estado', 'createdAt']
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return new User(user);
  }

  // Listar usuarios por rol
  async findByRole(role: RoleEnum): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: { role },
      select: ['id', 'nombre', 'email', 'role', 'estado', 'fecha_inscripcion', 'createdAt'],
    });
    return users.map(user => new User(user));
  }

  // Listar todos los usuarios (solo ID, email y rol)
  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'nombre', 'email', 'role', 'estado', 'fecha_inscripcion', 'createdAt'],
    });
    return users.map(user => new User(user));
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    const savedUser = await this.usersRepository.save(user);
    return new User(savedUser);
  }

  // ✅ Actualizar usuario (temporalmente sin validación de admin)
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({ 
      where: { id },
      select: ['id', 'nombre', 'email', 'fecha_inscripcion', 'role', 'estado', 'createdAt', 'password']
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    Object.assign(user, updateUserDto);
    const updatedUser = await this.usersRepository.save(user);
    return new User(updatedUser);
  }

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
}