// simple sqlite helper
import dotenv from 'dotenv';
import path from 'path';
import sqlite3 from 'sqlite3';
dotenv.config();

const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data.sqlite');

const db = new sqlite3.Database(DB_FILE);

function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
}
function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}
function get(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}
export { all, db, get, run };

