import {Database, open} from 'sqlite'
import { Database as db3, Statement} from 'sqlite3';
import { IDatabase } from '../interfaces/DatabaseInterfaces/IDatabase';

export class SQLiteDatabase implements IDatabase {
    private db : Database<db3, Statement>;
    constructor(private filepath : string) {}

    async connect(): Promise<void> {
        const config = {
            filename: this.filepath,
            driver: db3,
        } 
        try {
            this.db = await open(config);
            console.log("Database connection established");
        } catch (error) {
            console.error("Error opening the database:", error);
            throw error;
        }
    }

    public async query<T>(query : string, ...params : any): Promise<T[]> {
        const rows : T[] = await this.db.all(query, ...params);
        return rows;
    }

    public async execute(query : string, ...params : any): Promise<any> {
        const result = await this.db.run(query, ...params);
        return result;
    }

    public async createAllTables() : Promise<void> {
        await this.db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )`);
        await this.db.exec(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL
        )`);
    }
}