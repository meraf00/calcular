import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Formula } from 'src/entities/formula';
import { Repository } from 'typeorm';
import { CreateFormulaDto, UpdateFormulaDto } from '../dto/requests.dto';
import { EvaluatorService } from './evaluator.service';

@Injectable()
export class FormulaService {
  constructor(
    @InjectRepository(Formula)
    private readonly formulaRepository: Repository<Formula>,

    private readonly evaluatorService: EvaluatorService,
  ) {}

  async create(formula: CreateFormulaDto): Promise<Formula> {
    const availableFormulaSet = await this.getAvailableFormulaSetNames(
      formula.formulaGroupId,
    );

    try {
      this.evaluatorService.validate(
        formula.representation,
        availableFormulaSet,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return this.formulaRepository.save(formula);
  }

  async update(id: string, formula: UpdateFormulaDto): Promise<Formula> {
    const originalFormula = await this.findOneOrFail(id);
    const availableFormulaSet = await this.getAvailableFormulaSetNames(
      originalFormula.groupId,
    );

    try {
      if (formula.representation) {
        this.evaluatorService.validate(
          formula.representation,
          availableFormulaSet.filter((f) => f !== originalFormula.name),
        );
      }
      await this.formulaRepository.update(id, formula);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return { ...originalFormula, ...formula };
  }

  async delete(id: string): Promise<Formula> {
    const formula = await this.findOneOrFail(id);

    // Check if the formula is being used by other formulas in the same group
    const otherFormulasInGroup = (
      await this.findByGroup(formula.groupId)
    ).filter((f) => f.id !== id);

    otherFormulasInGroup.forEach((f) => {
      try {
        this.evaluatorService.validate(
          f.representation,
          otherFormulasInGroup.map((f) => f.name),
        );
      } catch (e) {
        throw new BadRequestException(
          `Formula ${formula.name} is being used by formula ${f.name}`,
        );
      }
    });

    await this.formulaRepository.delete(id);

    return formula;
  }

  async findAll(): Promise<Formula[]> {
    return this.formulaRepository.find();
  }

  async findByGroup(groupId: string): Promise<Formula[]> {
    return this.formulaRepository.find({ where: { groupId } });
  }

  async findOneOrFail(id: string): Promise<Formula> {
    return this.formulaRepository.findOneByOrFail({ id });
  }

  async getAvailableFormulaSetNames(groupId: string): Promise<string[]> {
    return (await this.findByGroup(groupId)).map((f) => f.name);
  }
}
