import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluatorService {
  parse(expression: string) {
    console.log(expression);
  }

  evaluate(expression: string, context: Record<string, number>): number {
    console.log(expression, context);
    return 1;
  }

  validate(expression: string, formulaSet: string[]) {
    console.log(expression, formulaSet);
  }
}
