import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './common/configs';
import { Orders } from './entities';
import { OrderService } from './services';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    SequelizeModule.forFeature([Orders]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OrderService],
})
export class AppModule {}
