import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { entities } from './entities';

const useSSL = process.env.CONNECT_DB_THROUGH_SSL === 'true';

export const DATA_SOURCE_CONFIG: DataSourceOptions = {
  type: 'mysql',
  url: process.env.DB_URL,
  entities,
  ssl: useSSL,
  extra: useSSL
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
  synchronize: false,
  logging: false,
};
