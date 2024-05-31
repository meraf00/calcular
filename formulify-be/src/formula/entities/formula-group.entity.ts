import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Formula } from './formula.entity';

@Entity({ name: 'formula_groups' })
export class FormulaGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Formula, (formula) => formula.group)
  formulas: Formula[];
}
