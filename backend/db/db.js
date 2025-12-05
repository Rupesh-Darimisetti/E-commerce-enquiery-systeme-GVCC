import path from 'path';
import sqlite3 from 'sqlite3';
import { open } from sqlite;

const dbPath = path.join(__dirname, 'schema.sql')
let db = null;

export const initalDBSetup = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        })
    } catch (error) {
        console.log(`DB Error: ${error.message}`)
        process.exit(1)
    }
}