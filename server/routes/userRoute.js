import express from 'express';
import * as usersController from '../controllers/userController.js';

const router = express.Router();

/**
 * createUser requires:
 *  - req.body.username,
 *  - req.body.email,
 *  - req.body.password
 *  - returns a unique ID
 */
router.post('/', usersController.createUser, (req, res) => {
  res.status(201).json({ createdUserId: res.locals.newUserId });
});

/**
 * loginUser requires:
 *  - req.body.username
 *  - req.body.password
 *  - returns the user obj of the user currently logged in.
 */
router.post('/login', usersController.loginUser, (req, res) => {
  res.status(200).json({ currentlyLoggedIn: res.locals.currentlyLoggedIn });
});

/**
 * editUser requires:
 *  - req.query.id
 *  - a req.body consisting of the following possible updates:
 *    - req.body.name
 *    - req.body.username
 *    - req.body.email
 *    - req.body.password
 *
 *  - returns an updated user obj
 */
router.post('/edit', usersController.editUser, (req, res) => {
  res.status(200).json({ editedUser: res.locals.foundAndUpdatedUser });
});

/**
 * deleteUser requires:
 *  - req.query.userid
 *  - returns the deleted status, username, and email of deleted user.
 */
router.delete('/delete', usersController.deleteUser, (req, res) => {
  res.status(200).json({ deletedUser: res.locals.deletedUser });
});

/**
 * editTask requires an object with these props:
 * NOTE: must send userid as a query param as 'userid'
 * NOTE: must send taskid as a query param as 'taskid'
 *
 *  - author: req.body.author,
 *  - tasktitle: req.body.tasktitle,
 *  - details: req.body.details,
 *  - priority: {
 *  -   primary: {
 *  -     level: req.body.priority.primary.level,
 *  -  *  -   },
 *  -   secondary: {
 *  -     importance: req.body.priority.secondary.importance,
 *  -     value: req.body.priority.secondary.value,
 *  -   },
 *  - },
 *  - completed: req.body.completed,
 *  - tags: [req.body.tags],
 */
router.post('/task/edit', usersController.editTask, (req, res) => {
  res.status(200).json({ tasklistWithEdits: res.locals.tasklistWithEdits });
});

/**
 * deleteTask requires two items sent as query params:
 *  - userid: req.query.userid
 *  - taskid: req.query.taskid
 */
router.delete('/task/delete', usersController.deleteTask, (req, res) => {
  res
    .status(200)
    .json({ tasklistWithTaskDeleted: res.locals.tasklistWithTaskDeleted });
});

/**
 * createTask requires an object with these props:
 * NOTE: must send userId as a query param as 'userid'
 *
 *  - author: req.body.author,
 *  - tasktitle: req.body.tasktitle,
 *  - details: req.body.details,
 *  - priority: {
 *  -   primary: {
 *  -     level: req.body.priority.primary.level,
 *  -  *  -   },
 *  -   secondary: {
 *  -     importance: req.body.priority.secondary.importance,
 *  -     value: req.body.priority.secondary.value,
 *  -   },
 *  - },
 *  - completed: req.body.completed,
 *  - tags: [req.body.tags],
 */
router.post('/task', usersController.createTask, (req, res) => {
  res.status(200).json({ tasklistWithNewTask: res.locals.tasklistWithNewTask });
});

export default router;
