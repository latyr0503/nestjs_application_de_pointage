import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Pointage } from 'src/pointages/pointages.entity';
import { Justifications_absence } from 'src/justifications_absence/justifications_absence.entity';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Pointage, (pointage) => pointage.user)
  pointages: Pointage[];

  @OneToMany(
    () => Justifications_absence,
    (justification) => justification.user,
  )
  justifications_absence: Justifications_absence[];
}
