import express from 'express'
import * as tasksController from '../controllers/taskController.js'

const router = express.Router()

router.post('/', tasksController.createTask)

export default router
