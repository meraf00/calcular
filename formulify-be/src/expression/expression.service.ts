import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpressionService {
  constructor(
    @InjectRepository(Expression)
    private expressionRepository: Repository<Expression>,
  ) {}

  async create(createExpressionDto: CreateExpressionDto) {
    const newExpression =
      await this.expressionRepository.create(createExpressionDto);
    return await this.expressionRepository.save(newExpression);
  }

  async findAll() {
    return await this.expressionRepository.find();
  }

  async findOne(id: string) {
    const expression = await this.expressionRepository.findOneBy({ id });
    if (!expression) {
      throw new NotFoundException(`No expression found with id ${id}`);
    }
    return expression;
  }

  async update(id: string, updateExpressionDto: UpdateExpressionDto) {
    const expression = await this.expressionRepository.findOneByOrFail({ id });
    return await this.expressionRepository.update(
      expression.id,
      updateExpressionDto,
    );
  }

  async remove(id: string) {
    return await this.expressionRepository.delete(id);
  }
}
