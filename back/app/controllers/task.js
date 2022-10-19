const { Task } = require('../models');

const taskController = {

    listTasks: async function (req, res) {
        const tasks = await Task.findAll();
        res.json(tasks)
    },

    async addTask(req, res) {
        const { name } = req.body;
        let bodyErrors = [];
        if (!name) {
            bodyErrors.push('name can not be empty');
        }

        if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
        } else {
            let newTask = Task.build({ name });
            await newTask.save();
            res.json(newTask);
        }
    },

    async modifyTask(req, res) {
        const taskId = req.params.id;
        const { name } = req.body;

        let task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).json('Can not find task with id ' + taskId);
        } else {
            if (name) {
                task.name = name;
            }
            await task.save();
            res.json(task);
        }
    },

    async deleteTask(req, res) {
        const taskId = req.params.id;
        let task = await Task.findByPk(taskId);
        if (!task) {
            res.status(404).json('Can not find task with id ' + taskId);
        } else {
            await task.destroy();

            res.status(204).json('');
        }
    }
};

module.exports = taskController;
