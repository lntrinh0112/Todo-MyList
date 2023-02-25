class App {
    constructor() {
        this.ListItems = [];
        this.loadApp();
    }

    loadApp() {
        this.renderData();
        this.renderUI();

    }

    renderData() {
        const data = JSON.parse(localStorage.getItem('todo-list'));
        if (data != null) {
            data.forEach(element => {
                this.addItemToListView(element.item, element.isCompleted);
                this.addItemtoData(element.item, element.isCompleted);

            });
        }
    }

    addItemtoData(item, isCompleted) {
        this.ListItems.push({"item": item, "checked": isCompleted});
    }

    addItemToListView(item, isCompleted) {
        let todoList = document.querySelector(".todo-list");
        let todoItem = document.createElement('li');
        let divView = document.createElement('div');
        let inputCheck = document.createElement('input');
        let todoItemName = document.createElement('label');
        let btnRemove = document.createElement('button');
        divView.classList.add('view');
        inputCheck.classList.add('toggle');
        btnRemove.classList.add('destroy');
        inputCheck.setAttribute('type', 'checkbox');
        inputCheck.setAttribute('id', 'btnCheck');
        todoItemName.setAttribute('id', 'text-label');
        todoItemName.textContent = item;
        if (isCompleted) {
            inputCheck.setAttribute('checked', 'checked');
        }
        divView.appendChild(inputCheck);
        divView.appendChild(todoItemName);
        divView.appendChild(btnRemove);
        todoItem.appendChild(divView);
        todoList.appendChild(todoItem);

    }

    renderUI() {
        const input = document.getElementById('new-todo');
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                var valueInput = input.value;
                if (valueInput.trim() != 0) {
                    this.addItemToListView(valueInput, false);
                    this.addItemtoData(valueInput, false);
                    this.saveData();
                    document.getElementById('new-todo').value = '';
                }
            }
        });
    }

    saveData() {
        localStorage.setItem('todo-list', JSON.stringify(this.ListItems));
    }

}
const todos = new App();
