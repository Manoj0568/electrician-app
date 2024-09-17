import express from 'express'
import dbConnect from './db/dbConnect.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import complaintRouter from './router/complaint.router.js'
import electricianRouter from './router/Electrician.router.js'
import AdminRouter from './router/Admin.router.js'

dotenv.config()
const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, DELETE, PUT",
    credentials: true
}))

app.use(cookieParser())
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use("/api",complaintRouter)
app.use("/api",electricianRouter)
app.use("/api",AdminRouter)

app.listen(PORT,(err,req,res,next)=>{
    dbConnect()
    console.log(`listening on port http://localhost:${PORT}`)
})