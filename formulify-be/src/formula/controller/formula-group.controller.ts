import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CreateFormulaGroupDto,
  UpdateFormulaGroupDto,
} from '../dto/requests.dto';
import { FormulaGroupService } from '../services/formula-group.service';

@ApiTags('formula-groups')
@Controller('formula-groups')
export class FormulaGroupController {
  constructor(private readonly formulaGroupService: FormulaGroupService) {}

  @Post()
  @ApiBody({ type: CreateFormulaGroupDto })
  create(@Body() createExpressionDto: CreateFormulaGroupDto) {
    return this.formulaGroupService.create(createExpressionDto);
  }

  @Get()
  findAll() {
    return this.formulaGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formulaGroupService.findOneOrFail(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateFormulaGroupDto })
  update(
    @Param('id') id: string,
    @Body() updateFormulaDto: UpdateFormulaGroupDto,
  ) {
    return this.formulaGroupService.update(id, updateFormulaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.formulaGroupService.delete(id);
  }
}
