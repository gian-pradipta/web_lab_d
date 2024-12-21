import {open} from 'sqlite'
import sqlite3 from 'sqlite3'

const config = {
    filename: '../database.db',
    driver: sqlite3.Database,
}

async function initializeDb() {
    try {
        const db = await open(config);
        console.log("Database connection established");
        await db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )`);
        return db;

    } catch (error) {
        console.error("Error opening the database:", error);
        throw error;
    }
}


const db = await initializeDb();

export default db;
