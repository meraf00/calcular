import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateExpressionDto {
  @ApiProperty({ description: 'The name of the expression' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The formula of the expression' })
  @IsString()
  formula: string;
}
