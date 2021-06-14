import axios from 'axios';
import User from '../models/userModel.js';

export const getUserAndTasks = async (req, res) => {
  console.log(`getUserAndTasks: `, res.body);
  res.send('getUserAndTasks');
};
export const createUser = async (req, res) => {
  console.log(`createUser: `, res.body);
  res.send('createUser');
};
export const editUser = async (req, res) => {
  console.log(`editUser: `, res.body);
  res.send('editUser');
};
export const deleteUser = async (req, res) => {
  console.log(`deleteUser: `, res.body);
  res.send('deleteUser');
};

export const editTask = async (req, res) => {
  console.log(`editTask: `, res.body);
  res.send('editTask');
};
export const deleteTask = async (req, res) => {
  console.log(`deleteTask: `, res.body);
  res.send('deleteTask');
};
