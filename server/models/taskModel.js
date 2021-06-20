import mongoose from 'mongoose';

const reqString = {
  type: String,
  required: true,
};
const reqNumber = {
  type: Number,
  required: true,
};
export const taskItemSchema = new mongoose.Schema(
  {
    author: reqString,
    tasktitle: reqString,
    details: String,
    priority: {
      primary: {
        level: {
          type: reqString, // low (1), high (2), urgent (3).
        }, //  NOTE: make sure to default to "low" client side.
        value: {
          type: reqNumber, // 1 (low), 2 (high), 3 (urgent)
        },  // NOTE: make sure to default to "1" client side.
      },
      secondary: {
        importance: reqString, // primary, secondary
        value: reqNumber, // 1, 2
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

const Task = mongoose.model('Task', taskItemSchema);

export default Task;
