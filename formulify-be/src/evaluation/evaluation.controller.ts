import { Body, Controller, Get, Req } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EvaluationDto } from './dto/evaluation.dto';

@Controller('evaluate')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @ApiTags('evaluation')
  @ApiOperation({ summary: 'Evaluate an expression' })
  @ApiBody({ type: EvaluationDto })
  @Get()
  async evaluate(@Body() evaluationDto: EvaluationDto) {
    const { expression, variableMap } = evaluationDto;
    return await this.evaluationService.evaluate(expression, variableMap);
  }
}
