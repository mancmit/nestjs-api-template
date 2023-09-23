import { DataSourceOptions, DataSource } from 'typeorm';
import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const _path = path.resolve(__dirname + '/../modules/**/domain/entities/*.entity{.ts,.js}');

export const AppDataSourceOption: DataSourceOptions = {
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [_path],
    synchronize: false,
    migrations: ['dist/migration/*js'],
    schema: process.env.TYPEORM_SCHEMA,
    logging: process.env.TYPEORM_LOGGING === 'true',
    connectTimeoutMS: Number(process.env.TYPEORM_TIMEOUT) || 10000,
    applicationName: process.env.APP_NAME,
    extra: {
        poolSize: Number(process.env.TYPEORM_POOLSIZE) || 100,
        query_timeout: Number(process.env.TYPEORM_TIMEOUT) || 10000,
        statement_timeout: Number(process.env.TYPEORM_TIMEOUT) || 10000,
    },
};

const datasource = new DataSource(AppDataSourceOption);
datasource.initialize();
module.exports = { datasource, AppDataSourceOption };
