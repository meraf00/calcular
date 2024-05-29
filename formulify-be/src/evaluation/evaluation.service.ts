import { Injectable } from '@nestjs/common';
import { ExpressionService } from 'src/expression/expression.service';
import { Variable } from 'src/variable/entities/variable.entity';
import { VariableService } from 'src/variable/variable.service';
import { evaluate } from 'mathjs';

@Injectable()
export class EvaluationService {
  private variablesList: Variable[] = [];

  constructor(private readonly variableService: VariableService) {}

  async evaluate(expression: string, variableMap: Record<string, any>) {
    try {
      // validate the expression and get the formula
      const formula = await this.validate(expression, variableMap);

      // compute the extracted formula
      return await this.compute(formula);
    } catch (error) {
      throw new Error(error);
    }
  }

  async validate(expression: string, variableMap: Record<string, any>) {
    const errors: Error[] = [];

    // validate the variables in  variableMap exist in the expression
    for (const variableId in variableMap) {
      if (!expression.includes(variableId)) {
        errors.push(
          new Error(`Variable with id ${variableId} not found in expression`),
        );
      }
    }

    // validate the variables in  variableMap exist in the database
    for (const variableId in variableMap) {
      if (!this.checkVariablesList(variableId)) {
        const variable = await this.variableService.findOne(variableId);
        this.variablesList.push(variable);

        if (!variable) {
          errors.push(
            new Error(
              `Invalid Expression: Variable with id ${variableId} not found in database`,
            ),
          );
        }
      }

      // replace the variable in the expression with its value
      expression = expression.replace(variableId, variableMap[variableId]);
    }

    if (errors.length > 0) {
      for (const error of errors) {
        throw error;
      }
    }

    return errors.length === 0 ? expression : null;
  }

  // compute the formula
  compute(formula: string) {
    try {
      const result = evaluate(formula);
      return result;
    } catch (error) {
      throw new Error(`Error evaluating expression: ${error.message}`);
    }
  }

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
