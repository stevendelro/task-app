import express from 'express';
import * as usersController from '../controllers/userController.js';

const router = express.Router();

router.post('/', usersController.createUser, (req, res) => {
  res.status(200).json({ createdUserId: res.locals.newUserId });
});

router.post('/login', usersController.loginUser, (req, res) => {
  res.status(200).json({ foundUser: res.locals.currentlyLoggedIn });
});

router.patch('/user/:id', usersController.editUser);
router.delete('/user/:id', usersController.deleteUser);

router.post('/task', usersController.createTask);
router.patch('/task/:id', usersController.editTask);
router.delete('/task/:id', usersController.deleteTask);


export default router;
