import { ApiProperty } from '@nestjs/swagger';

export class EvaluationDto {
  @ApiProperty({ description: 'The expression to be evaluated' })
  expression: string;

  @ApiProperty({ description: 'The variable map for the expression' })
  variableMap: Record<string, any>;
}
