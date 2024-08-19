import { Module } from '@nestjs/common';
import { RevenuController } from './revenu.controller';
import { RevenuService } from './revenu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenu } from './revenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Revenu])],
  controllers: [RevenuController],
  providers: [RevenuService],
})
export class RevenuModule {}
