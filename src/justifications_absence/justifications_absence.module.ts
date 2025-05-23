import { Module } from '@nestjs/common';
import { JustificationsAbsenceController } from './justifications_absence.controller';
import { JustificationsAbsenceService } from './justifications_absence.service';
import { Justifications_absence } from './justifications_absence.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Justifications_absence, User])],
  controllers: [JustificationsAbsenceController],
  providers: [JustificationsAbsenceService],
  exports: [JustificationsAbsenceService],
})
export class JustificationsAbsenceModule {}
