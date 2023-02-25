class App {
  constructor() {
    this.ListItems = [];
    this.loadApp();
  }
  loadApp() {
    this.renderData();
    this.renderUI();
    this.setCountItemLeft();
    this.renderFooter();
  }
  renderData() {
    const data = JSON.parse(localStorage.getItem("todo-list"));
    if (data.length != 0) {
      data.forEach((element) => {
        this.addElementToListView(element.item, element.checked);
        this.addItemtoData(element.item, element.checked);
        this.setCountItemLeft();
      });
    }
  }
  addItemtoData(item, isCompleted) {
    this.ListItems.push({ item: item, checked: isCompleted });
  }
  addElementToListView(item, isCompleted) {
    let todoList = document.querySelector(".todo-list");
    let todoItem = document.createElement("li");
    let divView = document.createElement("div");
    let inputCheck = document.createElement("input");
    let todoItemName = document.createElement("label");
    let btnRemove = document.createElement("button");
    divView.classList.add("view");
    inputCheck.classList.add("toggle");
    btnRemove.classList.add("destroy");
    inputCheck.setAttribute("type", "checkbox");
    inputCheck.setAttribute("id", "btnCheck");
    todoItemName.setAttribute("id", "text-label");
    todoItemName.textContent = item;
    if (isCompleted) {
      inputCheck.setAttribute("checked", "checked");
    }
    divView.appendChild(inputCheck);
    divView.appendChild(todoItemName);
    divView.appendChild(btnRemove);
    todoItem.appendChild(divView);
    todoList.appendChild(todoItem);

    btnRemove.addEventListener("click", (event) => {
      this.removeItem(event.target.closest("li"));
      event.target.closest("li").remove();
      this.setCountItemLeft();
    });
    inputCheck.addEventListener("click", (event) => {
      this.changeStateElement(event.target.closest("li"));
      this.changeItemByElement(event.target.closest("li"));
      this.saveData();
      this.renderFooter();
      this.setCountItemLeft();
    });
    todoItemName.addEventListener("keypress", (event) => {
      if (event.key === 13) {
        todoItemName.contentEditable = "false";
        this.changeItem(event.target.closest("li"));
      }
    });
  }
  renderUI() {
    const input = document.getElementById("new-todo");
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        var valueInput = input.value;
        if (valueInput.trim() != 0) {
          this.addElementToListView(valueInput, false);
          this.addItemtoData(valueInput, false);
          this.saveData();
          document.getElementById("new-todo").value = "";
          this.setCountItemLeft();
        }
      }
    });
    const showAll = document.querySelector(".ListItems");
    showAll.addEventListener("click", (event) => {
      event.preventDefault();
      let listElement = document.querySelectorAll(".todo-list li");
      listElement.forEach((element) => {
        element.classList.remove("hidden");
      });
      showAll.classList.add("active");
      showLeft.classList.remove("active");
      showCompleted.classList.remove("active");
    });
    const showLeft = document.querySelector(".ListItemsLeft");
    showLeft.addEventListener("click", (event) => {
      event.preventDefault();
      let listElement = document.querySelectorAll(".todo-list li");
      listElement.forEach((element) => {
        element.querySelector(":checked")
          ? element.classList.add("hidden")
          : element.classList.remove("hidden");
      });
      showLeft.classList.add("active");
      showAll.classList.remove("active");
      showCompleted.classList.remove("active");
      this.renderFooter();
    });
    const showCompleted = document.querySelector(".ListItemsCompleted");
    showCompleted.addEventListener("click", (event) => {
      event.preventDefault();
      let listElement = document.querySelectorAll(".todo-list li");
      listElement.forEach((element) => {
        element.querySelector(":checked")
          ? element.classList.remove("hidden")
          : element.classList.add("hidden");
      });
      showCompleted.classList.add("active");
      showLeft.classList.remove("active");
      showAll.classList.remove("active");
      this.renderFooter();
    });
    const clearCompleted = document.querySelector(".ClearCompleted");
    clearCompleted.addEventListener("click", (event) => {
      event.preventDefault();
      document
        .querySelectorAll('div input[type="checkbox"]:checked')
        .forEach((item) => {
          this.removeItem(item.closest("li"));
          item.closest("li").remove();
          this.saveData();
        });
      clearCompleted.setAttribute("style", "opacity: 0.5");
      clearCompleted.classList.add("hidden");
    });
  }
  renderFooter() {
    const clearCompleted = document.querySelector(".ClearCompleted");
    if (this.findItemLeft().length < this.ListItems.length) {
      clearCompleted.setAttribute("style", "opacity: 1");
      clearCompleted.classList.remove("hidden");
    } else {
      clearCompleted.setAttribute("style", "opacity: 0.5");
      clearCompleted.classList.add("hidden");
    }
  }
  saveData() {
    localStorage.setItem("todo-list", JSON.stringify(this.ListItems));
  }
  removeItem(element) {
    this.ListItems.splice(this.getIndexOfElement(element), 1);
    this.saveData();
  }
  getIndexOfElement(element) {
    return Array.from(element.closest("ul").children).indexOf(element);
  }
  changeStateElement(element) {
    return !this.getCurrentStateElement(element);
  }
  getCurrentStateElement(element) {
    return element.querySelector("input[type='checkbox']").checked;
  }
  changeItemByElement(element) {
    let currentIndex = this.getIndexOfElement(element);
    this.ListItems[currentIndex]["checked"] =
      this.getCurrentStateElement(element);
    this.saveData();
  }
  findItemLeft() {
    return this.ListItems.filter((item) => {
      return item["checked"] === false;
    }, []);
  }
  setCountItemLeft() {
    document.querySelector(".todo-count strong").innerHTML =
      this.findItemLeft().length;
  }
}
const todos = new App();
