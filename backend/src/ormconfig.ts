import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config'

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
  logging: true,
};

export const dataSource = new DataSource(databaseConfig);
