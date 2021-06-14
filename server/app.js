import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import taskRoute from './routes/taskRoute.js'
import userRoute from './routes/userRoute.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/task', taskRoute);
app.use('/users', userRoute);

const MONGO_SRV = ""


export default app
