import { Module } from '@nestjs/common';
import { ExpressionService } from './expression.service';
import { ExpressionController } from './expression.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expression } from './entities/expression.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expression])],
  controllers: [ExpressionController],
  providers: [ExpressionService],
  exports: [ExpressionService],
})
export class ExpressionModule {}
