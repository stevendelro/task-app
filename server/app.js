import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userRoute.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRoute);

const MONGO_SRV =
  'mongodb+srv://steven:thisisapassword@taskapp.1t2az.mongodb.net/task-app?retryWrites=true&w=majority';


mongoose
  .connect(MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch(error => console.error(error.message));

app.use((err, req, res, next) => {
  console.log(`err`, err)
  const defaultErr = {
    log: 'Default global error handler triggered',
    status: 400,
    error: { err: 'An error occurred processing your request.' },
  };
  const errObj = {...defaultErr, ...err};
  res.status(400).send(errObj.error);
});

export default app;
