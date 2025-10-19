import { getAllTask,getTaskById,InsertTask,DeleteTask,UpdateTask } from "../utility/service.js";
export async function sendTask(req,res){
    if(req.params.id){
        const task=await getTaskById(req.params)
        if(task)
            res.status(200).json(task)
        else    
            res.status(404).json("Not Found")
    }
    else{
        const alltask=await getAllTask()
        res.status(200).json(alltask)
    }
}

export async function createTask(req,res){
    const {title,description,status}=req.query
    console.log(typeof title)
    if(typeof title!=="string"||typeof description!=="string"){
        res.json({msg:"only string formate is accepted"})
    }
    else if(title){
        const taskInserted=await InsertTask(title,description,status)
        res.status(201).json(taskInserted)
    }
    else{
        res.json("Title is required")
    }

}
export async function updateTask(req,res){
    const {id}=req.params
    if(id){
        const updatedtask=await UpdateTask(id,req.query)
        if(updateTask){
            res.status(200).json(updatedtask)
        }
        else{
            res.json('nothing to change')
        }
    }
    else{
        res.status(404).json('provide id')
    }
}
export async function deleteTask(req,res){
    const {id}=req.params
    const task=getTaskById(id)
    const changes =await DeleteTask(id)
    if(changes)
        res(204).end()
    else
        res.status(404).json(`Task with id ${id} not found`)
}  