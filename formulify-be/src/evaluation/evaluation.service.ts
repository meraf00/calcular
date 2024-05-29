import { Injectable } from '@nestjs/common';
import { ExpressionService } from 'src/expression/expression.service';
import { Variable } from 'src/variable/entities/variable.entity';
import { VariableService } from 'src/variable/variable.service';

@Injectable()
export class EvaluationService {
  private variablesList: Variable[];

  constructor(
    private readonly variableService: VariableService,
    private readonly expressionService: ExpressionService,
  ) {}

  async evaluate(expression: string, variableMap: Record<string, any>) {
    await this.validate(expression, variableMap);
    return await this.compute(expression, variableMap);
  }

  async validate(expression: string, variableMap: Record<string, any>) {
    // validate the variables in  variableMap exist in the expression
    for (const variableId in variableMap) {
      if (!expression.includes(variableId)) {
        throw new Error(
          `Variable with id ${variableId} not found in expression`,
        );
      }
    }

    // validate the variables in  variableMap exist in the database
    for (const variableId in variableMap) {
      if (!this.checkVariablesList(variableId)) {
        const variable = await this.variableService.findOne(variableId);
        this.variablesList.push(variable);

        if (!variable) {
          throw new Error(
            `Invalid Expression: Variable with id ${variableId} not found in database`,
          );
        }
      }
    }

    // fetch the variables in the expression
    // const variables = expression.match(/\w+/g);
  }

  async compute(expression: string, variableMap: Record<string, any>) {}

  // check if the variable is already in the list
  checkVariablesList(variableId: string): boolean {
    const var_ = this.variablesList.find(
      (variable) => variable.id === variableId,
    );
    if (!var_) {
      return false;
    }
    return true;
  }
}
