import mongoose from 'mongoose';


const reqString = {
  type: String,
  required: true
}
const taskItemSchema = new mongoose.Schema(
  {
    author: reqString,
    tasktitle: reqString,
    details: String,
    priority: {
      primary: {
        type: String,
        required: true,
        level: {
          type: String,
          default: 'low',
        }, // low, high, urgent
        value: {
          type: Number,
          default: 1,
        }, // 1, 2, 3
      },
      secondary: {
        type: String,
        required: true,
        importance: String, // primary, secondary
        value: Number, // 1, 2
      },
    },
    completed: {
      type: Boolean,
      required: true,
    },
    tags: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const userSchema = new mongoose.Schema({
  name: reqString,
  username: reqString,
  email: reqString,
  password: reqString,
  tasklist: [taskItemSchema],
});



const User = mongoose.model('User', userSchema);

export default User;
