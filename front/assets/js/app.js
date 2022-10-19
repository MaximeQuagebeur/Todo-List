const app = {
    init: function () {

        taskManager.fetchAndInsertTasksFromApi();

        document.querySelector('.create-task').addEventListener('submit', taskManager.handleCreateForm);

    }

};

document.addEventListener('DOMContentLoaded', app.init);
