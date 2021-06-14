import express from 'express';
import * as usersController from '../controllers/userController.js';

const router = express.Router();

router.get('/', usersController.getUserAndTasks);
router.post('/', usersController.createUser);
router.patch('/:id', usersController.editUser);
router.delete('/:id', usersController.deleteUser);

router.patch('/tasklist/:taskId', usersController.editTask);
router.delete('/tasklist/:taskId', usersController.deleteTask);


export default router;
