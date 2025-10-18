import { getAllTask,getTaskById } from "../utility/service.js";
export async function sendTask(req,res){
    if(req.params.id){
        const task=await getTaskById(req.params)
        res.json(task)
    }
    else{
        const alltask=await getAllTask()
        res.json(alltask)
    }
}

export function createTask(req,res){

}
export function updateTask(req,res){

}
export function deleteTask(req,res){

}