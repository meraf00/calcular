import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { FormulaGroup } from './formula-group.entity';

@Entity({ name: 'formulas' })
@Unique(['groupId', 'name'])
export class Formula {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  representation: string;

  @Column()
  groupId: string;

  @ManyToOne(() => FormulaGroup, (group) => group.formulas)
  @JoinColumn({ name: 'groupId' })
  group: FormulaGroup;
}
