import { Database } from "sqlite";

export class DatabaseInfrastructure {
    private db : Database;

    constructor(db : Database) {
        this.db = db;
    }

    public async createTableUser() {
        await this.db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )`);
    }

    public async createTableQuestion() {
        await this.db.exec(`CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            title TEXT NOT NULL,
            body TEXT NOT NULL
        )`); 
    }

    public async createAllTables() {
        // await this.createTableUser();
        await this.createTableQuestion();
    }
}