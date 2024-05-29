import { DataSource } from 'typeorm';
import { Variable } from './variable/entities/variable.entity';
import { Expression } from './expression/entities/expression.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'dawit',
  database: 'formulify',
  entities: [Variable, Expression],
  synchronize: true, // Set to false in production
};

export const AppDataSource = new DataSource(dataSourceOptions);
