import {connectDB} from '../db/connectDB.js'
import {createTable} from '../db/createTable.js'


const db=await connectDB()
export async function getAllTask(){
    const query=`SELECT * FROM tasks;`
    const rows=await db.all(query)
    return rows

}
export async function getTaskById({id}){
    const query=`SELECT * FROM tasks WHERE id=?`
    const values=[id]
    const rows=await db.get(query,values)
    return rows
}

