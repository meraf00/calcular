import { Module } from '@nestjs/common';
import { ExpressionService } from './expression.service';
import { ExpressionController } from './expression.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';
import { VariableModule } from 'src/variable/variable.module';

@Module({
  imports: [TypeOrmModule.forFeature([Expression]), VariableModule],
  controllers: [ExpressionController],
  providers: [ExpressionService],
  exports: [ExpressionService],
})
export class ExpressionModule {}
