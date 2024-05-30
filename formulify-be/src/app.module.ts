import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpressionModule } from './expression/expression.module';
import { AppDataSource } from './data-source';
import { Expression } from './expression/entities/expression.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'dawit',
      database: 'formulify',
      entities: [Expression],
      synchronize: true,
    }),

    ExpressionModule,
  ],
})
export class AppModule {}
