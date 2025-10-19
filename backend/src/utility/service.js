import {connectDB} from '../db/connectDB.js'
import {createTable} from '../db/createTable.js'


const db=await connectDB()
export async function getAllTask(){
    const query=`SELECT * FROM tasks;`
    const rows=await db.all(query)
    return rows

}
export async function getTaskById(id){
    const query=`SELECT * FROM tasks WHERE id=?`
    const values=[id]
    const rows=await db.get(query,values)
    console.log(rows)
    return rows
}
export async function InsertTask(title,description,status){
    const query=`INSERT INTO tasks(title,description) VALUES(?,?,?)`
    const values=[title]
    if(description)
        values.add(description)
    else
        values.add(null)
    if(status)
        values.add(status)
    else
        values.add(null)
    const result= await db.run(query,values)
    const task=await getTaskById(result.lastID)
    return task
}
export async function UpdateTask(id,{title,description,status}) {
    let query='UPDATE tasks SET '
    const values=[]
    if(title){
        query+='title=? '
        values.push(title)
    }
    if(description){
        query+='description=? '
        values.push(description)
    }
    if(status){
        query+='status=? '
        values.push(status)
    }
    query+='WHERE id=?;'
    values.push(id)
    if(values.length===0){
        return null
    }
    else{
        await db.run(query,values)
        const task=await getTaskById(id)
        return task
    }
}
export async function DeleteTask(id) {
    const query=`DELETE FROM tasks WHERE id=?`
    const values=[id]
    const result=await db.run(query,values)
    return result.changes
}

