import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';
import { Repository } from 'typeorm';
import { VariableService } from 'src/variable/variable.service';

@Injectable()
export class ExpressionService {
  constructor(
    @InjectRepository(Expression)
    private expressionRepository: Repository<Expression>,
    private readonly variableService: VariableService,
  ) {}

  async create(createExpressionDto: CreateExpressionDto) {
    const newExpression = this.expressionRepository.create({
      ...createExpressionDto,
      variables: [],
    });

    const expression = await this.expressionRepository.save(newExpression);

    const variables = createExpressionDto.variables.map(async (variable) => {
      return await this.variableService.create({
        name: variable,
        expressionId: expression.id,
      });
    });

    return { ...expression, variables: await Promise.all(variables) };
  }

  async findAll() {
    return await this.expressionRepository.find({
      relations: {
        variables: true,
      },
    });
  }

  async findOne(id: string) {
    const expression = await this.expressionRepository.findOne({
      where: { id },
      relations: {
        variables: true,
      },
    });
    if (!expression) {
      throw new NotFoundException(`No expression found with id ${id}`);
    }
    return expression;
  }

  async update(id: string, updateExpressionDto: UpdateExpressionDto) {
    const expression = await this.expressionRepository.findOneByOrFail({ id });
    return await this.expressionRepository.update(expression.id, {
      ...updateExpressionDto,
      variables: updateExpressionDto.variables.map((variableId) => ({
        id: variableId,
      })),
    });
  }

  async remove(id: string) {
    return await this.expressionRepository.delete(id);
  }
}
