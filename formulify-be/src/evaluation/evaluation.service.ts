import { Injectable } from '@nestjs/common';
import { ExpressionService } from 'src/expression/expression.service';
import { Variable } from 'src/variable/entities/variable.entity';
import { VariableService } from 'src/variable/variable.service';
import { evaluate } from 'mathjs';
import { Parser } from 'src/expression';

@Injectable()
export class EvaluationService {
  private variablesList: Variable[] = [];

  constructor(private readonly expressionService: ExpressionService) {}

  async evaluate(expressionId: string, variableMap: Record<string, number>) {
    try {
      // validate the expression and get the formula
      const formula = await this.validate(expressionId, variableMap);

      // compute the extracted formula
      return await this.compute(formula, variableMap);
    } catch (error) {
      throw new Error(error);
    }
  }

  async validate(expressionId: string, variableMap: Record<string, number>) {
    const errors: Error[] = [];

    const expression = (await this.expressionService.findOne(expressionId))
      .formula;

    // validate the variables in  variableMap exist in the expression
    for (const variableName in variableMap) {
      if (!expression.includes(variableName)) {
        errors.push(
          new Error(`Variable with id ${variableName} not found in expression`),
        );
      }
    }

    const parser = new Parser(expression);
    try {
      parser.validate(Object.keys(variableMap));
    } catch (error) {
      errors.push(error);
    }

    // validate the variables in  variableMap exist in the database
    // for (const variableId in variableMap) {
    // if (!this.checkVariablesList(variableId)) {
    // const variable = await this.variableService.findOne(variableId);
    // this.variablesList.push(variable);

    // if (!variable) {
    //   errors.push(
    //     new Error(
    //       `Invalid Expression: Variable with id ${variableId} not found in database`,
    //     ),
    //   );
    // }
    // }

    // replace the variable in the expression with its value
    // expression = expression.replace(variableId, variableMap[variableId]);
    // }

    if (errors.length > 0) {
      for (const error of errors) {
        throw error;
      }
    }

    return errors.length === 0 ? expression : null;
  }

  // compute the formula
  compute(formula: string, variableMap: Record<string, number>) {
    try {
      const result = evaluate(formula, variableMap);
      return result;
    } catch (error) {
      throw new Error(`Error evaluating expression: ${formula}`);
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
