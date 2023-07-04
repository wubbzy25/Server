import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Fields {
  @PrimaryColumn()
  id: string;
  @Column()
  subIndex: number;
  @Column()
  CategoryIndex: number;
  @Column()
  type: string;
  @Column()
  top: number;
  @Column()
  left: number;
  @Column()
  value: string;
  @Column()
  width: number;
  @Column({ type: 'boolean' })
  block: boolean;
}
