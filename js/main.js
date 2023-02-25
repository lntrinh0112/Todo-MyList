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
                this.addElementToListView(element.item, element.isCompleted);
                this.addItemtoData(element.item, (element.isCompleted === true) ? "true" : "false");
            });
        }
    }

    addItemtoData(item, isCompleted) {
        this.ListItems.push({"item": item, "checked": isCompleted});
    }

    addElementToListView(item, isCompleted) {
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

        btnRemove.addEventListener('click', (event) => {
            this.removeItem(event.target.closest('li'));
            event.target.closest('li').remove();
        });
        inputCheck.addEventListener('click', (event) => {
            this.changeStateElement(event.target.closest('li'));
            this.changeItemByElement(event.target.closest('li'));
        });
        todoItemName.addEventListener('keypress', (event) => {
            if (event.key === 13) {
                todoItemName.contentEditable = 'false';
                this.changeItem(event.target.closest('li'));
            }
        });
    }

    renderUI() {
        const input = document.getElementById('new-todo');
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                var valueInput = input.value;
                if (valueInput.trim() != 0) {
                    this.addElementToListView(valueInput, false);
                    this.addItemtoData(valueInput, false);
                    this.saveData();
                    document.getElementById('new-todo').value = '';
                    // this.setCountItemLeft();
                }
            }
        });
    }
    saveData() {
        localStorage.setItem('todo-list', JSON.stringify(this.ListItems));
    }
    removeItem(element) {
        this.ListItems.splice(this.getIndexOfElement(element), 1);
        this.saveData();
    }
    getIndexOfElement(element) {
        return Array.from(element.closest('ul').children).indexOf(element);
    }
    changeStateElement(element) {
        return !this.getCurrentStateElement(element);
    }
    getCurrentStateElement(element) {
        return element.querySelector("input[type='checkbox']").checked;
    }
    changeItemByElement(element) {
        let currentIndex = this.getIndexOfElement(element);
        this.ListItems[currentIndex]["checked"] = this.getCurrentStateElement(element);
        console.log(this.ListItems[currentIndex]);
        this.saveData();
    }

}
const todos = new App();
