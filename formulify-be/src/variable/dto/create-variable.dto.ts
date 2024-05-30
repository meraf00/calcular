import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional } from 'class-validator';
// Adjust the path as needed

export class CreateVariableDto {
  @ApiProperty({ description: 'The name of the variable' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The value of the variable' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The expression ID of the variable' })
  @IsUUID()
  expressionId: string;
}
