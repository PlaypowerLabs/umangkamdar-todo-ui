getToDo();

//add task
const add = document.getElementById("add-btn");
const txtInput = document.querySelector(".txt-input");
add.addEventListener("click", function () {
  const item = txtInput.value.trim();
  if (item) {
    txtInput.value = "";

    const todos = !localStorage.getItem("todos")
      ? []
      : JSON.parse(localStorage.getItem("todos"));

    var currentTodo = {};
    // if (todos.length === 0) {
    //   currentTodo = {
    //     id: 0,
    //     item,
    //     isCompleted: false,
    //   };
    // } else {
    currentTodo = {
      id: "id-" + new Date().getTime(), // unqiue id
      item,
      isCompleted: false,
    };
    // }

    getToDo([currentTodo]);
    todos.push(currentTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  txtInput.focus();
});

txtInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    add.click();
  }
});

//checkbox
function stateTodo(id, completed) {
  console.log("id: ", id);
  const todos = JSON.parse(localStorage.getItem("todos"));

  var index = todos.findIndex(std => std.id === id); // findIndex() is a function o find the Index from json object

  todos[index].isCompleted = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Show Todos
function getToDo(todos = JSON.parse(localStorage.getItem("todos"))) {
  if (!todos) {
    return null;
  }

  todos.forEach(function (todo) {
    console.log("todo: ", todo);
    const card = document.createElement("li");
    const divElement = document.createElement("div");
    const checkBoxInput = document.createElement("input");

    const item = document.createElement("p");

    card.classList.add("card");
    divElement.classList.add("cb-container");
    checkBoxInput.classList.add("cb-input");
    item.classList.add("item");

    checkBoxInput.setAttribute("type", "checkbox");
    card.setAttribute("id", todo.id);

    item.textContent = todo.item;

    if (todo.isCompleted) {
      card.classList.add("checked");
      checkBoxInput.setAttribute("checked", "checked");
    }

    // Add event listener for checkbox
    checkBoxInput.addEventListener("click", function () {
      const selectedCard = this.parentElement.parentElement;
      const checked = this.checked;
      console.log("card: ", selectedCard);
      const id = selectedCard.getAttribute("id");

      stateTodo(id, checked);

      checked
        ? selectedCard.classList.add("checked")
        : selectedCard.classList.remove("checked");

      divElement.appendChild(checkBoxInput);
      divElement.appendChild(item);

      if (card.classList.contains("checked")) {
        card.appendChild(divElement);
        document.querySelector(".comp").appendChild(card);
      } else {
        card.appendChild(divElement);
        document.querySelector(".not-comp").appendChild(card);
      }
    });

    divElement.appendChild(checkBoxInput);
    divElement.appendChild(item);
    if (card.classList.contains("checked")) {
      card.appendChild(divElement);
      document.querySelector(".comp").appendChild(card);
    } else {
      card.appendChild(divElement);
      document.querySelector(".not-comp").appendChild(card);
    }
  });
}
