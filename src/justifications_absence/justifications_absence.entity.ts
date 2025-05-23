import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Justifications_absence {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.justifications_absence)
  user: User;

  @Column()
  date: Date;

  @Column()
  motif: string;
}
