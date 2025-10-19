import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'

export async function connectDB(){
    try{
        const db=await open({
        filename:path.join('database.db'),
        driver:sqlite3.Database
        })
        return db
    }
    catch(err){
        console.error("❌ Failed to connect to database:", err.message);
        throw err;
    }
}
