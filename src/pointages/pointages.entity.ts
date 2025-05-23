import { User } from 'src/auth/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

export enum StatutPointage {
  PRESENT = 'present',
  ABSENT = 'absent',
  RETARD = 'retard',
}

@Entity()
export class Pointage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.pointages)
  user: User;

  @Column()
  date: Date;

  @Column({ type: 'time' })
  heure_arrivee: string;

  @Column({ type: 'time', nullable: true })
  heure_depart: string;

  @Column({
    type: 'enum',
    enum: StatutPointage,
  })
  statut: StatutPointage;
}
