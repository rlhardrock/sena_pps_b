import { PartialType } from '@nestjs/mapped-types';
import { CreateCarcassDto } from './create-carcass.dto';

export class UpdateCarcassDto extends PartialType(CreateCarcassDto) {}
