import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Expression {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  formula: string;

  @Column('jsonb', { nullable: true })
  dependencies: Record<string, string>[];
}
