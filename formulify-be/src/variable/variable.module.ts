import { Module } from '@nestjs/common';
import { VariableService } from './variable.service';
import { VariableController } from './variable.controller';

@Module({
  controllers: [VariableController],
  providers: [VariableService],
})
export class VariableModule {}
