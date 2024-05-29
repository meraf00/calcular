import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableModule } from './variable/variable.module';
import { ExpressionModule } from './expression/expression.module';
import { AppDataSource } from './data-source';
import { Expression } from './expression/entities/expression.entity';
import { Variable } from './variable/entities/variable.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'dawit',
      database: 'formulify',
      entities: [Variable, Expression],
      synchronize: true,
    }),
    VariableModule,
    ExpressionModule,
  ],
})
export class AppModule {}
