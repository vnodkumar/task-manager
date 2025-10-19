import express from 'express'
import {sendTask,createTask,updateTask,deleteTask} from '../controller/controllers.js'
export const appRouter=express.Router();

appRouter.get('/tasks',async (req,res)=>{
    await sendTask(req,res)
})
appRouter.get('/tasks/:id',async (req,res)=>{
    await sendTask(req,res)
})
appRouter.post('/tasks',async(req,res)=>{
    await createTask(req,res)
})
appRouter.put('/tasks/:id',async(req,res)=>{
    await updateTask(req,res)
})
appRouter.delete('/tasks/:id',async(req,res)=>{
    await deleteTask(req,res)
})