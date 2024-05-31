import { Module } from '@nestjs/common';
import { EvaluatorService } from './services/evaluator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Formula } from 'src/entities/formula.entity';
import { FormulaGroup } from 'src/entities/formula-group.entity';
import { FormulaController } from './controller/formula.controller';
import { FormulaService } from './services/formula.service';
import { FormulaGroupController } from './controller/formula-group.controller';
import { FormulaGroupService } from './services/formula-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Formula, FormulaGroup])],
  providers: [EvaluatorService, FormulaService, FormulaGroupService],
  controllers: [FormulaController, FormulaGroupController],
})
export class FormulaModule {}
