'C:\\Users\\Gian\\Documents\\ukdw\\ukdw_smt7\\lab-discussion-platform\\lab-discussion-platform\\backend\\database.db';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    pg: {
        client: 'postgresql',
        connection: {
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
            filename: "../../database.db"
        },
        useNullAsDefault: true,
        migrations: {
            tableName: 'knex_migrations',
        },
    }
};
exports.default = config;
