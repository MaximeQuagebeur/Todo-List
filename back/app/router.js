const express = require('express');
const router = express.Router();
const taskController = require('./controllers/task');

router.get('/tasks', taskController.listTasks);

router.post('/tasks', taskController.addTask);

router.put('/tasks/:id', taskController.modifyTask);

router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
