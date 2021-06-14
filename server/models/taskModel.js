import mongoose from 'mongoose';

const taskItemSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    ref: 'User'
  },
  taskTitle: {
    type: String,
    required: true,
  },
  details: String,
  priority: {
    primary: {
      type: String,
      required: true,
      name: String, // low, high, urgent
      value: Number, // 1, 2, 3
    },
    secondary: {
      type: String,
      required: true,
      name: String, // primary, secondary
      value: Number, // 1, 2
    },
  },
  completed: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
    date: String,
    timestamp: Date,
  },
  dateEdited: {
    type: String,
    required: true,
    date: String,
    timestamp: Date,
  },
  tags: [String],
});

const TaskItem = mongoose.model('TaskItem', taskItemSchema);

export default TaskItem;
