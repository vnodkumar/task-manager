import { getAllTask,getTaskById,InsertTask,DeleteTask,UpdateTask } from "../utility/service.js";

export async function sendTask(req,res){
    try{if(req.params.id){
        const task=await getTaskById(req.params)
        if(task)
            res.status(200).json(task)
        else    
            res.status(404).json("Not Found")
    }
    else{
        const alltask=await getAllTask()
        res.status(200).json(alltask)
    }}
    catch(err){
        console.log(err)
        res.status(500).json({error:"Failed to get task"})
    }
}

export async function createTask(req,res){
    
    try{
        const {title,description,status}=req.query
        const taskInserted=await InsertTask(title,description,status)
        res.status(201).json(taskInserted)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Failed to create task'})
    }
    

}
export async function updateTask(req,res){
    
    try{
        const {id}=req.params
        const updatedtask=await UpdateTask(id,req.query)
        res.status(200).json(updatedtask)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Failed to update task"})
    }
    
}
export async function deleteTask(req,res){
    try{    
        const {id}=req.params
        const task=getTaskById(id)
        const changes =await DeleteTask(id)
        res.status(204).json('succesful')
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Failed to delete task'})
    }
}  