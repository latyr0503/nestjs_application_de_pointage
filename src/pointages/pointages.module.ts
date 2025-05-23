import { Module } from '@nestjs/common';
import { PointagesController } from './pointages.controller';
import { PointagesService } from './pointages.service';
import { Pointage } from './pointages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pointage, User])],
  controllers: [PointagesController],
  providers: [PointagesService],
  exports: [PointagesService],
})
export class PointagesModule {}
