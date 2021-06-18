import mongoose from 'mongoose';

const taskItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      ref: 'User',
    },
    tasktitle: {
      type: String,
      required: true,
    },
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
          default: 1
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
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  }
);

const TaskItem = mongoose.model('TaskItem', taskItemSchema);

export default TaskItem;
