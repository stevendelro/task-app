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

router.post('/task', usersController.createTask);
router.patch('/task/:id', usersController.editTask);
router.delete('/task/:id', usersController.deleteTask);

export default router;
