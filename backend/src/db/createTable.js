import path from 'node:path'
import fs from 'fs/promises'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'

export async function createTable(){
    const db=await open({
        filename:path.join('database.db'),
        driver:sqlite3.Database,
    })

    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'pending',
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    await db.close()
}