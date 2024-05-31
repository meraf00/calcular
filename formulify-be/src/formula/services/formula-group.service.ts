import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateFormulaGroupDto,
  UpdateFormulaGroupDto,
} from '../dto/requests.dto';
import { FormulaGroup } from 'src/formula/entities/formula-group.entity';

@Injectable()
export class FormulaGroupService {
  constructor(
    @InjectRepository(FormulaGroup)
    private readonly formulaGroupRepository: Repository<FormulaGroup>,
  ) {}

  async create(formulaGroup: CreateFormulaGroupDto): Promise<FormulaGroup> {
    return this.formulaGroupRepository.save(formulaGroup);
  }

  async update(
    id: string,
    formulaGroup: UpdateFormulaGroupDto,
  ): Promise<FormulaGroup> {
    await this.formulaGroupRepository.update(id, formulaGroup);

    return await this.findOneOrFail(id);
  }

  async delete(id: string) {
    await this.findOneOrFail(id);
    await this.formulaGroupRepository.delete(id);
  }

  async findAll(): Promise<FormulaGroup[]> {
    return this.formulaGroupRepository.find();
  }

  async findOneOrFail(id: string): Promise<FormulaGroup> {
    try {
      return await this.formulaGroupRepository.findOneByOrFail({ id });
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
