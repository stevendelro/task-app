import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const getUserAndTasks = async (req, res, next) => {
  const userToRetrieve = req.params.id;
  try {
    const signedInUser = await User.find({ id: userToRetrieve });
    console.log(`users in getUserAndTasks: `, signedInUser);
  } catch (error) {
    console.error('ERROR IN getUserAndTasks: ', error.message);
  }
};
export const createUser = async (req, res, next) => {
  try {
    // bcrypt async try/catch error handling
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(`${req.body.password}`, salt);
    try {
      // mongodb create user try/catch error handling
      const newUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hash,
        tasklist: [],
      });
      res.locals.newUserId = newUser.id;
      return next();
    } catch (error) {
      // TODO: make a global error handler, send it an error here.
      console.error('ERROR IN mongoDB createUser: ', error.message);
    }
  } catch (error) {
    // TODO: make a global error handler, send it an error here.
    console.error('ERROR IN bcrypt password hashing: ', error.message);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    const isVerified = await bcrypt.compare(
      `${req.body.password}`,
      foundUser.password
    );
    if (isVerified) {
      res.locals.currentlyLoggedIn = {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,        tasklist: [],
      };
    }
    return next()
  } catch (error) {
    console.error('ERROR IN verifyUser, user not found: ', error.message);
  }
};

export const editUser = async (req, res, next) => {
  const userToEdit = req.params.id;
  res.send();
};
export const deleteUser = async (req, res, next) => {
  const userToDelete = req.params.id;
  res.send();
};

export const editTask = async (req, res, next) => {
  const taskToEdit = req.params.taskId;
  res.send();
};
export const deleteTask = async (req, res, next) => {
  const taskToDelete = req.params.taskId;
  res.send();
};
