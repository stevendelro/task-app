import mongoose from 'mongoose';

 // STRETCH GOAL: detailed user info for a user account page
const userSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
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
    type: String, // Figure out how to NOT store in plaintext
    required: true,
  },
  taskList: [{
    type: Object,
    ref: 'TaskItem'
  }]
});

const User = mongoose.model('User', userSchema);

export default User;
