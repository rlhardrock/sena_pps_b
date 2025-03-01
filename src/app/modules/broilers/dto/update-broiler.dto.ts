import { PartialType } from '@nestjs/mapped-types';
import { CreateBroilerDto } from './create-broiler.dto';

export class UpdateBroilerDto extends PartialType(CreateBroilerDto) {}
