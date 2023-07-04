import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Images {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  subIndex: number;
  @Column()
  CategoryIndex: number;
  @Column('longblob')
  imageUrl: string;
}
