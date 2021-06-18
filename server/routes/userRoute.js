import express from 'express';
import * as usersController from '../controllers/userController.js';

const router = express.Router();

router.post('/', usersController.createUser, (req, res) => {
  res.status(200).json({ createdUserId: res.locals.newUserId });
});

router.post('/login', usersController.loginUser, (req, res) => {
  res.status(200).json({ foundUser: res.locals.currentlyLoggedIn });
});

router.post('/addTask') // figure out how to add tasks to tasklist with refs
router.get('/:id', usersController.getUserTasks);
router.patch('/:id', usersController.editUser);
router.delete('/:id', usersController.deleteUser);

router.patch('/tasklist/:taskId', usersController.editTask);
router.delete('/tasklist/:taskId', usersController.deleteTask);


export default router;
