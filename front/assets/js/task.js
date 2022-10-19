const taskManager = {
    apiEndpoint: 'http://localhost:3000',

    fetchAndInsertTasksFromApi: async function (event) {

        const response = await fetch(`${taskManager.apiEndpoint}/tasks`);
        const data = await response.json();

        for (const task of data) {
            taskManager.insertTaskInHtml(task);
        }


    },

    insertTaskInHtml: function (taskData) {

        const taskTemplate = document.querySelector('.template-task');
        const newTask = document.importNode(taskTemplate.content, true);

        newTask.querySelector('.task__name').textContent = taskData.name;
        newTask.querySelector('.task__input-name').value = taskData.name;
        newTask.querySelector('.task__input-id').value = taskData.id;
        newTask.querySelector('.task').dataset.id = taskData.id;

        newTask.querySelector('.task__delete').addEventListener(
            'click', taskManager.handleDeleteButton);

        newTask.querySelector('.task__edit').addEventListener(
            'click', taskManager.handleEditButton);

        newTask.querySelector('.task__edit-form').addEventListener(
            'submit', taskManager.handleEditForm);

        document.querySelector('.tasks').append(newTask);

    },

    handleCreateForm: async function (event) {
        event.preventDefault();
        const taskFormData = new FormData(event.currentTarget);

        const response = await fetch(`${taskManager.apiEndpoint}/tasks`, {
            method: 'POST',
            body: taskFormData
        });
        const data = await response.json();

        taskManager.insertTaskInHtml(data);

        event.target.querySelector('.input').value = '';

    },

    handleDeleteButton: async function (event) {

        const taskHtmlElement = event.currentTarget.closest('.task');
        const taskId = taskHtmlElement.dataset.id;

        const notifTemplate = document.querySelector('.confirmNotif');
        const notif = document.importNode(notifTemplate.content, true);

        taskHtmlElement.parentNode.insertBefore(notif, taskHtmlElement);
        taskHtmlElement.remove();
        const notifsArray = document.querySelectorAll('.notification');

        await fetch(`${taskManager.apiEndpoint}/tasks/${taskId}`, {
            method: 'DELETE',
        });

        for (const notif of notifsArray) {
            setTimeout(() => {
                notif.remove();
            }, 2000)
        }
    },

    handleEditButton: function (event) {
        const taskHtmlElement = event.currentTarget.closest('.task');
        taskHtmlElement.querySelector('.task__edit-form').style.display = 'flex';
        taskHtmlElement.querySelector('.task__name').style.display = 'none';
    },

    handleEditForm: async function (event) {
        event.preventDefault();

        const taskHtmlElement = event.currentTarget.closest('.task');

        const taskFormData = new FormData(event.currentTarget);

        const taskId = taskFormData.get('id');

        const response = await fetch(`${taskManager.apiEndpoint}/tasks/${taskId}`, {
            method: 'PUT',
            body: taskFormData
        });
        const data = await response.json();


        taskHtmlElement.querySelector('.task__name').textContent = data.name

        taskHtmlElement.querySelector('.task__edit-form').style.display = 'none';
        taskHtmlElement.querySelector('.task__name').style.display = 'block';
    }

};
