import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateExpressionDto {
  @IsString()
  @ApiProperty({ description: 'The name of the expression' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'The formula of the expression' })
  formula: string;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  @ApiProperty({
    description:
      'The dependencies of the expression. Record<nameInFormula, expressionId>. It should be an array of objects with the key as the name in the formula and the value  as the id of the expression.',
  })
  dependencies?: Record<string, string>[];

  // Record<nameInFormula, expressionId>
}
