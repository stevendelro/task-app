import mongoose from 'mongoose';
import { imgSchema } from './imgModel.js';
import { taskItemSchema } from './taskModel.js'

const reqString = {
  type: String,
  required: true,
};

const userSchema = new mongoose.Schema({
  name: reqString,
  avatar: imgSchema,
  username: reqString,
  email: reqString,
  password: reqString,
  tasklist: [taskItemSchema],
});

const User = mongoose.model('User', userSchema);

export default User;
