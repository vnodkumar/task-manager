import {connectDB} from '../db/connectDB.js'


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
export async function getAllTask(){
    try{
        const query=`SELECT * FROM tasks;`
        const rows=await db.all(query)
        return rows
    }
    catch(err){
        console.log('Failed to get all tasks:'+err.message)
        throw err
    }
}
export async function getTaskById(id){
    try{
    const query=`SELECT * FROM tasks WHERE id=?`
    const values=[id]
    const row=await db.get(query,values)
    return row
    }
    catch(err){
        console.log('Failed to get task:'+err.message)
        throw err
    }
}
export async function InsertTask(title,description,status){
    try{
        const query=`INSERT INTO tasks(title,description,status) VALUES(?,?,?)`
        const values=[title]
        if(description)
            values.push(description)
        else
            values.push(null)
        if(status)
            values.push(status)
        else
            values.push('pending')
        const result= await db.run(query,values)
        const task=await getTaskById(result.lastID)
        return task
    }
    catch(err){
        console.log('Failed to insert task:'+err.message)
        throw err
    }
}

export async function UpdateTask(id,{title,description,status}) {
    try{const updates=[]
    const values=[]

    if(title){updates.push('title=?');values.push(title)}
    if(description){updates.push('description=?');values.push(description)}
    if(status){updates.push('status=?');values.push(status)}

    const query=`UPDATE tasks SET ${updates.join(',')} WHERE id=?;`
    values.push(id)

    if(values.length===0){
        return null
    }
    else{
        await db.run(query,values)
        const task=await getTaskById(id)
        return task
    }}
    catch(err){
        console.log('Failed to update task:'+err.message)
        throw err
    }
}

export async function DeleteTask(id) {
    try{const query=`DELETE FROM tasks WHERE id=?`
    const values=[id]
    const result=await db.run(query,values)
    return result.changes}
    catch(err){
        console.log('Failed to delete task:'+err.message)
        throw err
    }

}

