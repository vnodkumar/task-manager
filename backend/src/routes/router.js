import express from 'express'
import {sendTask,createTask,updateTask,deleteTask} from '../controller/controllers.js'
export const appRouter=express.Router();

appRouter.get('/tasks',(req,res)=>{
    sendTask(req,res)
})
appRouter.get('/tasks/:id',(req,res)=>{
    sendTask(req,res)
})
appRouter.post('/tasks',(req,res)=>[
    createTask(req,res)
])
appRouter.put('/tasks/:id',(req,res)=>{
    updateTask(req,res)
})
appRouter.delete('/tasks/:id',(req,res)=>{
    deleteTask(req,res)
})