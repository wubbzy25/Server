import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './categories.entities';

@Entity()
export class SubItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  subitem: string;
  @ManyToOne(() => Category, (category) => category.subitems)
  category: Category;
}
