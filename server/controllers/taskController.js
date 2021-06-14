import TaskItem from '../models/taskModel.js';

export const createTask = async (req, res) => {
  // const { task } = req.body.data;
  console.log(`res.body IN CREATE TASK: `, res.body)
  res.send('createTask')
};
