import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
// import routes

const app = express();

app.use(cors());
app.use(express.json());
// set app to use routes

const MONGO_SRV = ""


export default app
