import { Expression } from 'src/expression/entities/expression.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Variable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Expression, (expression) => expression.variables)
  @JoinColumn({ name: 'expressionId' })
  expression: Expression;

  @Column()
  expressionId: string;
}
