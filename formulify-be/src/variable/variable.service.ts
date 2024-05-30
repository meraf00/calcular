import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Variable } from './entities/variable.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VariableService {
  constructor(
    @InjectRepository(Variable)
    private readonly variableRepository: Repository<Variable>,
  ) {}

  async create(createVariableDto: CreateVariableDto) {
    const newVariable = this.variableRepository.create(createVariableDto);
    return await this.variableRepository.save(newVariable);
  }

  async findAll() {
    return await this.variableRepository.find();
  }

  async findOne(id: string) {
    const variable = await this.variableRepository.findOneBy({ id });
    if (!variable) {
      throw new NotFoundException(`Variable with id ${id} not found`);
    }
    return variable;
  }

  async update(id: string, updateVariableDto: UpdateVariableDto) {
    const variable = await this.variableRepository.findOneByOrFail({ id });
    return await this.variableRepository.update(variable.id, updateVariableDto);
  }

  async remove(id: string) {
    return await this.variableRepository.delete(id);
  }
}
