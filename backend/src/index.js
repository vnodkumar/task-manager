import express from 'express'
import { appRouter } from './routes/router.js'

const PORT=8000
const app=express()

app.use('/api',appRouter)
app.listen(PORT,()=>console.log(`Server is running on port:${PORT}`))