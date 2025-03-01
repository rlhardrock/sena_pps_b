import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBroilerDto } from './dto/create-broiler.dto';
import { Broiler } from './entities/broiler.entity';

@Injectable()
export class BroilersService {
  constructor(
    @InjectRepository(Broiler)
    private readonly broilersRepository: Repository<Broiler>,
  ) {}

  async create(createBroilerDto: CreateBroilerDto): Promise<Broiler> {
    const broiler = this.broilersRepository.create(createBroilerDto);
    return await this.broilersRepository.save(broiler);
  }
}
