import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariableModule } from './variable/variable.module';
import { ExpressionModule } from './expression/expression.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { ConfigModule } from '@nestjs/config';
import { EvaluatorModule } from './evaluator/evaluator.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts}'],
      synchronize: true,
    }),
    VariableModule,
    ExpressionModule,
    EvaluationModule,
    EvaluatorModule,
  ],
})
export class AppModule {}
