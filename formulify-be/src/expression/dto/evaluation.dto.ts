import { ApiProperty } from '@nestjs/swagger';

export class EvaluationDto {
  @ApiProperty({ description: 'The expression to be evaluated' })
  expressionId: string;

  @ApiProperty({ description: 'The variable map for the expression' })
  variableMap: Record<string, number>; //Record<ExpressionId, VariableName>
}
