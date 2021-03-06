import path from 'path'
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/userRoute.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

// API ENTRY POINT
app.use('/user', userRoute);

const MONGO_SRV =
  'mongodb+srv://steven:thisisapassword@taskapp.1t2az.mongodb.net/task-app?retryWrites=true&w=majority';

const LOCAL_MONGO = 'mongodb://localhost/task-app'

mongoose
  // .connect(MONGO_SRV, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: false,
  // })
  .connect(LOCAL_MONGO)
  .then(() => console.log('DB CONNECTED'))
  .catch(error => console.error(error.message));

// WEBPACK
app.use('/build', express.static(path.resolve(__dirname, '../client/build')));
app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, '../client/public/index.html'));
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log(`err`, err);
  const defaultErr = {
    log: 'Default global error handler triggered',
    status: 400,
    error: { err: 'An error occurred processing your request.' },
  };
  const errObj = { ...defaultErr, ...err };
  res.status(400).send(errObj.error);
});

export default app;
