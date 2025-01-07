import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RevenuModule } from './revenu/revenu.module';
import { DepenseModule } from './depense/depense.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      ssl: {
        ca: fs.readFileSync('./certs/ca-certificate.crt').toString(),
      },
      autoLoadEntities: true,
    }),
    RevenuModule,
    DepenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
