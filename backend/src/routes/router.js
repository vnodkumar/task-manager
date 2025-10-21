import express from 'express'
import { getAllTask,getTaskById,InsertTask,DeleteTask,UpdateTask } from "../utility/service.js";

export const appRouter=express.Router();

appRouter.get('/tasks',async (req,res)=>{
    try{
        const alltask=await getAllTask()
        res.status(200).json(alltask)
    }
     catch(err){
        console.log(err)
        res.status(500).json({error:"Failed to get task"})
    }
})
appRouter.get('/tasks/:id',async (req,res)=>{
    try{
        const {id}=req.params
        const task=await getTaskById(id)
        if(!task) return res.status(404).json({error:"Task not found"})
        res.status(200).json(task)
    }
     catch(err){
        console.log(err)
        res.status(500).json({error:"Failed to get task"})
    }
})
appRouter.post('/tasks',async(req,res)=>{
    try{
        const {title,description,status}=req.body
        const taskInserted=await InsertTask(title,description,status)
        res.status(201).json(taskInserted)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Failed to create task'})
    }
})
appRouter.put('/tasks/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const payload=req.body
        if(!payload||Object.keys(payload).length===0) res.status(400).json({error:"no fields provided to update"})
        const updatedtask=await UpdateTask(id,payload)
        if(!updatedtask) res.status(400).json({error:"Task not found or nothing to update"})
        res.status(200).json(updatedtask)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"Failed to update task"})
    }
})
appRouter.delete('/tasks/:id',async(req,res)=>{
    try{    
        const {id}=req.params
        const changes =await DeleteTask(id)
        if(!changes||changes===0) res.status(400).json('Task not found')
        res.status(204).end()
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Failed to delete task'})
    }
})