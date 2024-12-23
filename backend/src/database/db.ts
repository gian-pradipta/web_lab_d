import {Database, open} from 'sqlite'
import { Database as db3, Statement} from 'sqlite3';

const config = {
    filename: '../../database.db',
    driver: db3,
}

async function initializeDb() : Promise<Database> {
    try {
        const db : Database<db3, Statement> = await open(config);
        console.log("Database connection established");
        return db;
    } catch (error) {
        console.error("Error opening the database:", error);
        throw error;
    }
}


export default initializeDb;
