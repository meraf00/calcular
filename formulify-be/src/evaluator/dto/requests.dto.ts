import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

// Formula Group DTOs
export class CreateFormulaGroupDto {
  @ApiProperty({
    description: 'Group name.',
  })
  @IsString()
  name: string;
}

export class UpdateFormulaGroupDto {
  @ApiProperty({
    description: 'Group name.',
  })
  @IsString()
  name: string;
}

// Formula DTOs
export class CreateFormulaDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'String representation of the formula. Using mathematical operators, variables, or referencing other formulas by name.',
  })
  @IsString()
  representation: string;

  @ApiProperty({
    type: 'uuid',
    description: 'UUID of the formula group to which this formula belongs.',
  })
  @IsUUID()
  formulaGroupId: string;
}

export class UpdateFormulaDto extends PartialType(CreateFormulaDto) {}
