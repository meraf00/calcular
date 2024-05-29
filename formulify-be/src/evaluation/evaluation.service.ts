import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationService {
  async evaluate(expression: string, variableMap: Record<string, any>) {
    await this.validate(expression, variableMap);
    return await this.compute(expression, variableMap);
  }

  async validate(expression: string, variableMap: Record<string, any>) {}

  async compute(expression: string, variableMap: Record<string, any>) {}
}
