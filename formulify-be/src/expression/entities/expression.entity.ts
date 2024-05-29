import { Variable } from 'src/variable/entities/variable.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Expression {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  formula: string;

  @OneToMany(() => Variable, (variable) => variable.id)
  variables: Variable[];
}
