import path from 'node:path'
import fs from 'fs/promises'
import {open} from 'sqlite'
import sqlite3 from 'sqlite3'
import { connectDB } from './connectDB.js'

export async function createTable(){
    try{
        const db=await connectDB()

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
    catch(err){
        console.log('failed to create table:'+err.message)
        throw err
    }
}