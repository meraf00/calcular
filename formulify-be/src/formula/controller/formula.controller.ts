import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  CreateFormulaDto,
  EvaluateFormulaDto,
  UpdateFormulaDto,
} from '../dto/requests.dto';
import { FormulaService } from '../services/formula.service';

@ApiTags('formulas')
@Controller('formulas')
export class FormulaController {
  constructor(private readonly formulaService: FormulaService) {}

  @Post(':id/evaluated')
  @ApiParam({ name: 'id', description: 'Formula ID' })
  @ApiBody({ type: EvaluateFormulaDto })
  async evaluate(
    @Body() evaluateDto: EvaluateFormulaDto,
    @Param('id') id: string,
  ) {
    return this.formulaService.evaluate(id, evaluateDto);
  }

  @Post()
  @ApiBody({ type: CreateFormulaDto })
  create(@Body() createExpressionDto: CreateFormulaDto) {
    return this.formulaService.create(createExpressionDto);
  }

  @Get()
  findAll() {
    return this.formulaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.formulaService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateFormulaDto })
  update(
    @Param('id') id: string,
    @Body() updateExpressionDto: UpdateFormulaDto,
  ) {
    return this.formulaService.update(id, updateExpressionDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.formulaService.delete(id);
  }
}
