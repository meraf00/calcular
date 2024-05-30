import { Module } from '@nestjs/common';
import { EvaluatorService } from './services/evaluator.service';

@Module({
  providers: [EvaluatorService],
})
export class EvaluatorModule {}
