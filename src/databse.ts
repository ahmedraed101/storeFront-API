import { Pool, ClientConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    ENV,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE_DEV,
    DB_DATABASE_TEST,
} = process.env;

const config: ClientConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE_DEV,
};

if (ENV === 'test') {
    config.database = DB_DATABASE_TEST;
}

const client = new Pool(config);

export default client;
