import express from "express";
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
import cors from 'cors'


import connectMongoDB from './db/connectMongoDB'
import authRoutes from './routes/auth.routes'
import taskRoutes from './routes/task.routes'

const PORT = process.env.PORT || 5000;

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())


app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB()
});
