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

  async evaluate(
    id: string,
    variables: Record<string, number>,
  ): Promise<number> {
    const formula = await this.findOneOrFail(id);

    const availableFormulaSet = await this.getAvailableFormulaSet(
      formula.groupId,
    );

    return this.evaluatorService.evaluate(
      formula.representation,
      variables,
      availableFormulaSet,
    );
  }

  async create(formula: CreateFormulaDto): Promise<Formula> {
    const availableFormulaSet = await this.getAvailableFormulaSet(
      formula.formulaGroupId,
    );

    try {
      // Check if the new formula does not create any circular dependencies
      const formulaSetAfterCreate = {
        ...availableFormulaSet,
        [formula.name]: formula.representation,
      };
      this.evaluatorService.validate(formulaSetAfterCreate);
    } catch (error) {
      throw new BadRequestException(error.message);
    }

    return this.formulaRepository.save(formula);
  }

  async update(id: string, formula: UpdateFormulaDto): Promise<Formula> {
    const originalFormula = await this.findOneOrFail(id);

    const availableFormulaSet = await this.getAvailableFormulaSet(
      originalFormula.groupId,
    );

    try {
      // Check if the new formula update does not create any problem
      const formulaSetAfterUpdate = {
        ...availableFormulaSet,
        [formula.name]: formula.representation,
      };
      this.evaluatorService.validate(formulaSetAfterUpdate);

      await this.formulaRepository.update(id, formula);
    } catch (e) {
      throw new BadRequestException(e.message);
    }

    return { ...originalFormula, ...formula };
  }

  async delete(id: string): Promise<Formula> {
    const formula = await this.findOneOrFail(id);

    const availableFormulaSet = await this.getAvailableFormulaSet(
      formula.groupId,
    );

    try {
      // Check if the formula is being used by other formulas in the same group
      const formulaSetAfterDelete = { ...availableFormulaSet };
      delete formulaSetAfterDelete[formula.name];
      this.evaluatorService.validate(formulaSetAfterDelete);
    } catch (e) {
      throw new BadRequestException(
        `Formula ${formula.name} is being used by formula ${formula.name}`,
      );
    }

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

  async getAvailableFormulaSet(
    groupId: string,
  ): Promise<Record<string, string>> {
    /**
    {
      'formula1': '2 + 2',
      'formula2': 'formula1 * 2',
    }
    */
    const formulaSet: Record<string, string> = {};

    (await this.findByGroup(groupId)).forEach((f) => {
      formulaSet[f.name] = f.representation;
    });

    return formulaSet;
  }
}
