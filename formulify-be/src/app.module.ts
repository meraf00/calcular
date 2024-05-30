import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableModule } from './variable/variable.module';
import { ExpressionModule } from './expression/expression.module';
import { AppDataSource } from './data-source';
import { Expression } from './expression/entities/expression.entity';
import { Variable } from './variable/entities/variable.entity';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'formulify',
      entities: [Variable, Expression],
      synchronize: true,
    }),
    VariableModule,
    ExpressionModule,
    EvaluationModule,
  ],
})
export class AppModule {}
