import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { PointagesModule } from './pointages/pointages.module';
import { JustificationsAbsenceModule } from './justifications_absence/justifications_absence.module';

// import * as fs from 'fs';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    PointagesModule,
    JustificationsAbsenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
