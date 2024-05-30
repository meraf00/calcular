import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';
import { In, Repository } from 'typeorm';
import { ExpressionP, Parser } from '../expression';

@Injectable()
export class ExpressionService {
  private allExpressions: Expression[] = [];
  constructor(
    @InjectRepository(Expression)
    private expressionRepository: Repository<Expression>,
  ) {
    this.fetchAllExpressions();
  }
  async fetchAllExpressions() {
    this.allExpressions = await this.expressionRepository.find();
  }

  async create(createExpressionDto: CreateExpressionDto) {
    const errors: Error[] = [];

    // validate creation:  check if there are dependencies
    try {
      if (createExpressionDto.dependencies.length > 0) {
        //: check if all dependencies are in the database
        const dependencyIds = createExpressionDto.dependencies.map((dep) => {
          const deps = Object.entries(dep);
          if (deps.length !== 1) {
            errors.push(
              new Error(
                `Invalid Dependencies List: more than 1 entry for ${dep} within ${createExpressionDto.dependencies} `,
              ),
            );
          }
          return deps[0][1];
        });

        const dependencies = await this.expressionRepository.findBy({
          id: In(dependencyIds),
        });
        if (dependencies.length !== dependencyIds.length) {
          errors.push(
            new Error(
              'Invalid Dependencies List: All dependencies should be in the database.',
            ),
          );
        }
      }
    } catch (error) {
      errors.push(error);
      // throw error;
    }

    // create the expression
    if (errors.length > 0) {
      throw new Error(errors.join('\n'));
    } else {
      const newExpression =
        await this.expressionRepository.create(createExpressionDto);

      // update the allExpressions list
      this.allExpressions.push(newExpression);

      return await this.expressionRepository.save(newExpression);
    }
  }

  async evaluate(expressionId: string, variableMap: Record<string, number>) {
    const expression = this.allExpressions.find((e) => e.id === expressionId);
    const expressionP = new ExpressionP(
      expression.id,
      expression.name,
      expression.formula,
      [],
    );

    // expression map
    const expressionMap = {};
    for (const e of this.allExpressions) {
      expressionMap[e.name] = e;
    }

    // Initialize parser
    const parser = new Parser(expressionP, expressionMap);
    return parser.evaluate(variableMap);
  }

  async findAll() {
    return await this.expressionRepository.find();
  }

  async findOne(id: string) {
    const expression = await this.expressionRepository.findOne({
      where: { id },
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
    });
  }

  async remove(id: string) {
    return await this.expressionRepository.delete(id);
  }
}
