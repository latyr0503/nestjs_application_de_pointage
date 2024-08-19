import { Module } from '@nestjs/common';
import { DepenseController } from './depense.controller';
import { DepenseService } from './depense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depense } from './depense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Depense])],
  controllers: [DepenseController],
  providers: [DepenseService],
})
export class DepenseModule {}
