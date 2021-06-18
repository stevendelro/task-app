import mongoose from 'mongoose';

 // STRETCH GOAL: detailed user info for a user account page
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasklist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaskItem',
    },
  ],
});



const User = mongoose.model('User', userSchema);

export default User;
