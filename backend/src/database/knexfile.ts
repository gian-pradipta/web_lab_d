import { Knex } from "knex";
import path from "path";

const dbDirectory = path.resolve(__dirname);  // Current directory
const parentDir = path.resolve(dbDirectory, '..', '..');  // Two steps up
const dbPath = path.join(parentDir, 'database.db');
const config: { [key: string]: Knex.Config } = {
    pg: {
        client: 'postgresql',
        connection: {
            host: "postgres",
            port: 5432,
            database: 'lab_d',
            user: 'postgres',
            password: 'B3rasm3ntah'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },

    sqlite: {
        client: 'sqlite3',
        connection: {
            filename: dbPath
        },
        useNullAsDefault: true,
        migrations: {
            tableName: 'knex_migrations',
        },
    }
};

export default config;
