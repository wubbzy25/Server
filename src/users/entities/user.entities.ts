import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  gmail: string;
  @Column()
  password: string;
  @Column()
  AccessToken: string;
  @Column({ type: 'boolean' })
  IsAdmin: boolean;
}
