import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Expression {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  formula: string;

  @OneToMany(() => Expression, (expression) => expression.formula)
  dependencies: Expression[];
}
