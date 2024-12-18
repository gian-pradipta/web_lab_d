import db from "../db.js"

async function createTableUser() {
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
    )`);
}

async function createTableQuestion() {
    await db.exec(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL
    )`);
    
}
async function createAllTables() {
    await createTableUser();
    await createTableQuestion();
}

export default createAllTables;