import express from 'express'
import { appRouter } from './src/routes/router.js'
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const PORT=process.env.PORT||8000;
const app=express();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api',appRouter);

//start server
app.listen(PORT,()=>console.log(`Server is running on port:${PORT}`));

app.use((err,req,res,next)=>{
    console.error(err)
    res.status(err.status||500).json({message:err.message||"internal server error"});
});