import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariableService } from './variable.service';
import { CreateVariableDto } from './dto/create-variable.dto';
import { UpdateVariableDto } from './dto/update-variable.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('variable')
export class VariableController {
  constructor(private readonly variableService: VariableService) {}

  @Post()
  @ApiBody({ type: CreateVariableDto })
  create(@Body() createVariableDto: CreateVariableDto) {
    return this.variableService.create(createVariableDto);
  }

  @Get()
  findAll() {
    return this.variableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variableService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateVariableDto })
  update(
    @Param('id') id: string,
    @Body() updateVariableDto: UpdateVariableDto,
  ) {
    return this.variableService.update(id, updateVariableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variableService.remove(id);
  }
}
