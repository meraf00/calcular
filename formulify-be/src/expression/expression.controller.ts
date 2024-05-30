import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpressionService } from './expression.service';
import { CreateExpressionDto } from './dto/create-expression.dto';
import { UpdateExpressionDto } from './dto/update-expression.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EvaluationDto } from './dto/evaluation.dto';

@Controller('expression')
export class ExpressionController {
  constructor(private readonly expressionService: ExpressionService) {}

  @Post()
  @ApiBody({ type: CreateExpressionDto })
  create(@Body() createExpressionDto: CreateExpressionDto) {
    return this.expressionService.create(createExpressionDto);
  }

  @ApiOperation({ summary: 'Evaluate an expression' })
  @ApiBody({ type: EvaluationDto })
  @Post('evaluate')
  async evaluate(@Body() evaluationDto: EvaluationDto) {
    const { expressionId, variableMap } = evaluationDto;
    return await this.expressionService.evaluate(expressionId, variableMap);
  }

  @Get()
  findAll() {
    return this.expressionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expressionService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateExpressionDto })
  update(
    @Param('id') id: string,
    @Body() updateExpressionDto: UpdateExpressionDto,
  ) {
    return this.expressionService.update(id, updateExpressionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expressionService.remove(id);
  }
}
