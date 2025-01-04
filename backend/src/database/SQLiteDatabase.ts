import Knex from "knex";
import config from './knexfile.js';
import { IDatabase } from "../interfaces/DatabaseInterfaces/IDatabase";

export class SQLiteDatabase implements IDatabase{
    public builder : Knex.Knex;
    constructor() {
        this.builder = Knex(config.sqlite);
    }
    // public async createAllTables() : Promise<void> {
    //     await this.db.exec(`CREATE TABLE IF NOT EXISTS users (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name TEXT NOT NULL,
    //         email TEXT UNIQUE NOT NULL
    //     )`);
    //     await this.db.exec(`CREATE TABLE IF NOT EXISTS questions (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         name TEXT NOT NULL,
    //         title TEXT NOT NULL,
    //         body TEXT NOT NULL
    //     )`);

    //     await this.db.exec(`
    //         CREATE TABLE IF NOT EXISTS answers (
    //             id INTEGER PRIMARY KEY AUTOINCREMENT,
    //             question_id INTEGER NOT NULL,
    //             body TEXT NOT NULL,
    //             FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    //         )
    //     `);
    // }
}