import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { SubItem } from './subitem.entities';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @OneToMany(() => SubItem, (subitem) => subitem.category)
  @JoinColumn()
  subitems: SubItem[];
}
