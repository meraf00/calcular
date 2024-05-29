import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';

import { VariableModule } from 'src/variable/variable.module';
import { ExpressionModule } from 'src/expression/expression.module';

@Module({
  imports: [ExpressionModule, VariableModule],
  controllers: [EvaluationController],
  providers: [EvaluationService],
})
export class EvaluationModule {}
