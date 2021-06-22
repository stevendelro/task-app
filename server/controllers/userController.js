import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(`${req.body.password}`, salt);
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      tasklist: [],
    });
    res.locals.newUser = newUser;
    return next();
  } catch (error) {
    console.error('ERROR in createUser: ', error.message);
    return next(error);
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
      res.locals.currentlyLoggedIn = foundUser;
    }
    return next();
  } catch (error) {
    console.error('ERROR in loginUser, user not found: ', error.message);
    return next(error);
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
      { _id: req.query.userid },
      {
        username: req.body.username ? req.body.username : undefined,
        email: req.body.email ? req.body.email : undefined,
        password: hash ? hash : undefined,
      },
      { new: true, omitUndefined: true }
    );
    res.locals.foundAndUpdatedUser = foundAndUpdatedUser;
    return next();
  } catch (error) {
    console.error('ERROR in editUser, user not found: ', error.message);
    return next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { username, email } = await User.findByIdAndDelete(req.query.userid);
    res.locals.deletedUser = {
      status: `The user: "${username}" has been removed from the app.`,
      username,
      email,
    };
    return next();
  } catch (error) {
    console.error('ERROR in deleteUser: ', error.message);
    return next(error);
  }
};

export const editTask = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.query.userid });
    const newTaskList = [];

    user.tasklist.forEach((item, index) => {
      if (item.id !== req.query.taskid) {
        throw { message: `EDIT - TASK ID: "${req.query.taskid}" was not found.` };
      }
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
    res.locals.tasklistWithEdits = tasklist;
    return next();
  } catch (error) {
    console.error('ERROR in editTask: ', error.message);
    return next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  let taskIdExists = false;
  try {
    const user = await User.findById({ _id: req.query.userid });
    const newTaskList = [];

    user.tasklist.forEach(item => {
      if (item.id === req.query.taskid) taskIdExists = true;
    });

    if (taskIdExists) {
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
      res.locals.tasklistWithTaskDeleted = tasklist;
      return next();
    } else {
      taskIdExists = true // reset taskIdExist flag for future requests.
      throw { message: `DELETE - TASK ID: "${req.query.taskid}" was not found.` };
    }
  } catch (error) {
    console.error('ERROR in deleteTask: ', error.message);
    return next(error);
  }
};

export const createTask = async (req, res, next) => {
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
    res.locals.tasklistWithNewTask = updatedUser.tasklist;
    return next();
  } catch (error) {
    console.error('ERROR in createTask: ', error.message);
    return next(error);
  }
};
