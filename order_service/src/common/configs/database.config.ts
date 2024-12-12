import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

export const databaseConfig = (): SequelizeModuleOptions => {
  const dialect = process.env.DIALECT as Dialect;
  if (dialect === 'mysql') {
    return {
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      pool: {
        min: 0,
        max: 10,
        acquire: 30000,
        idle: 10000,
      },
    };
  }
  throw new Error(`Unsupported database dialect: ${dialect}`);
};
