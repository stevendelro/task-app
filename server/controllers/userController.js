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
};

export const loginUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    const isVerified = await bcrypt.compare(
      `${req.body.password}`,
      foundUser.password
    );
    if (isVerified && foundUser) {
      res.locals.currentlyLoggedIn = {
        id: foundUser.id,
        name: foundUser.name,
        username: foundUser.username,
        tasklist: [],
      };
    }
    return next();
  } catch (error) {
    console.error('ERROR IN loginUser, user not found: ', error.message);
  }
};

export const editUser = async (req, res, next) => {
  let salt, hash;
  if (req.body.password) {
    salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(`${req.body.password}`, salt);
  }

  try {
    const foundAndUpdatedUser = await User.findByIdAndUpdate(
      { _id: req.query.id },
      {
        name: req.body.name ? req.body.name : undefined,
        username: req.body.username ? req.body.username : undefined,
        email: req.body.email ? req.body.email : undefined,
        password: hash ? hash : undefined,
      },
      { new: true, omitUndefined: true }
    );
    res.json(foundAndUpdatedUser);
  } catch (error) {
    res.json({ error }); // TODO: handle this error
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { username, email } = await User.findByIdAndDelete(req.query.id);
    res.json({
      status: `The user: "${username}" has been removed from the database.`,
      username,
      email,
    });
  } catch (error) {
    console.log(`ERROR IN deleteUser: `, error);
  }
};

export const createTask = async (req, res, next) => {
console.log(`req.body`, req.body)
  try {
    const currentUserData = await User.findById({ _id: req.query.userid });
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.query.userid },
      {
        tasklist: [
          ...currentUserData.tasklist,
          {
            author: req.body.author,
            tasktitle: req.body.tasktitle,
            details: req.body.details,
            priority: {
              primary: {
                level: req.body.priority.primary.level,
                value: req.body.priority.primary.value,
              },
              secondary: {
                importance: req.body.priority.secondary.importance,
                value: req.body.priority.secondary.value,
              },
            },
            completed: req.body.completed,
            tags: [...req.body.tags],
          },
        ],
      },
      { new: true, omitUndefined: true }
    );
    res.json({ updatedTasklist: updatedUser.tasklist });
  } catch (error) {
    console.error('ERROR IN CREATE TASK: ', error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.query.userid });
    const newTaskList = [];

    user.tasklist.forEach(item => {
      if (item.id !== req.query.taskid) newTaskList.push(item);
    });
    const { tasklist } = await User.findByIdAndUpdate(
      { _id: req.query.userid },
      {
        tasklist: [...newTaskList],
      },
      { new: true, omitUndefined: true }
    );
    res.json({ tasklist });
  } catch (error) {
    console.error('ERROR IN DELETE TASK: ', error);
  }
};

export const editTask = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.query.userid });
    const newTaskList = [];

    user.tasklist.forEach((item, index) => {
      if (item.id === req.query.taskid) {
        item = {
          author: req.body.author,
          tasktitle: req.body.tasktitle,
          details: req.body.details,
          priority: {
            primary: {
              level: req.body.priority.primary.level,
              value: req.body.priority.primary.value,
            },
            secondary: {
              importance: req.body.priority.secondary.importance,
              value: req.body.priority.secondary.value,
            },
          },
          completed: req.body.completed,
          tags: [...user.tasklist[index].tags, ...req.body.tags],
        };
      }
      newTaskList.push(item);
    });
    const { tasklist } = await User.findByIdAndUpdate(
      { _id: req.query.userid },
      {
        tasklist: [...newTaskList],
      },
      { new: true, omitUndefined: true }
    );
    res.json({ tasklist });
  } catch (error) {
    console.error('ERROR IN DELETE TASK: ', error);
  }
};
