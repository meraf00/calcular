import { IsString } from 'class-validator';

export class CreateExpressionDto {
  @IsString()
  name: string;

  @IsString()
  formula: string;
}
