import express from 'express';
import * as usersController from '../controllers/userController.js';

const router = express.Router();
/**
 * createUser requires:
 *  - req.body.name,
 *  - req.body.username,
 *  - req.body.email,
 *  - req.body.password
 *  - returns a unique ID
 */
router.post('/', usersController.createUser, (req, res) => {
  res.status(200).json({ createdUserId: res.locals.newUserId });
});
/**
 * editUser requires:
 *  - req.query.id
 *  - a req.body consisting of the updates
 *  - returns an updated user obj
 */
router.post('/edit', usersController.editUser);
/**
 * deleteUser requires:
 *  - req.query.id
 *  - returns the deleted status, username, and email of deleted user.
 */
router.delete('/delete', usersController.deleteUser);
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
router.post('/task/edit', usersController.editTask);
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
router.post('/task', usersController.createTask);
/**
 * deleteTask requires two items sent as query params:
 *  - userid: req.query.userid
 *  - taskid: req.query.taskid
 */
router.delete('/task/delete', usersController.deleteTask);


export default router;
