import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenuModule } from './revenu/revenu.module';
import { DepenseModule } from './depense/depense.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bd_gestion_budget',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RevenuModule,
    DepenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
