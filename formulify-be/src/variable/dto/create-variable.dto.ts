import { IsUUID, IsString, IsOptional } from 'class-validator';
// Adjust the path as needed

export class CreateVariableDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
