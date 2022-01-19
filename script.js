var allTodos;
async function getapi() {
  // Storing response
  const response = await fetch("http://localhost:5000/todos");

  // Storing data in form of JSON
  var data = await response.json();

  getToDo(data);

  return data;
}

allTodos = getapi();

const add = document.getElementById("add-btn");
const txtInput = document.querySelector(".txt-input");
add.addEventListener("click", async function () {
  const item = txtInput.value.trim();
  if (item) {
    txtInput.value = "";

    var currentTodo = {
      id: "id-" + new Date().getTime(), // unqiue id
      item: item,
      isCompleted: false,
    };

    getToDo([currentTodo]);

    await fetch("http://localhost:5000/todos", {
      method: "POST",
      body: JSON.stringify(currentTodo),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }
  txtInput.focus();
});

txtInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    add.click();
  }
});

async function getToDo(todos = allTodos) {
  if (!todos) {
    return null;
  }

  todos.forEach(function (todo) {
    console.log("todo: ", todo);
    const card = document.createElement("li");
    const divElement = document.createElement("div");
    const item = document.createElement("p");
    const checkBoxInput = document.createElement("input");

    const delButton = document.createElement("button");

    card.classList.add("card");
    divElement.classList.add("cb-container");
    checkBoxInput.classList.add("cb-input");
    item.classList.add("item");
    delButton.classList.add("del");

    checkBoxInput.setAttribute("type", "checkbox");
    card.setAttribute("id", todo.id);

    delButton.textContent = "Delete";
    item.textContent = todo.item;

    if (todo.isCompleted) {
      card.classList.add("checked");
      checkBoxInput.setAttribute("checked", "checked");
    }

    // Add event listener for checkbox
    checkBoxInput.addEventListener("click", async function () {
      const selectedCard = this.parentElement.parentElement;
      const checked = this.checked;
      console.log("card: ", selectedCard);
      const id = selectedCard.getAttribute("id");

      await stateTodo(id, checked);

      checked
        ? selectedCard.classList.add("checked")
        : selectedCard.classList.remove("checked");

      divElement.appendChild(checkBoxInput);
      divElement.appendChild(item);
      divElement.appendChild(delButton);

      if (card.classList.contains("checked")) {
        card.appendChild(divElement);
        document.querySelector(".comp").appendChild(card);
      } else {
        card.appendChild(divElement);
        document.querySelector(".not-comp").appendChild(card);
      }
    });

    delButton.addEventListener("click", async function () {
      const selectedCard = this.parentElement.parentElement;
      const checked = this.checked;
      console.log("card: ", selectedCard);
      const id = selectedCard.getAttribute("id");

      await deleteTodo(id);

      if (card.classList.contains("checked")) {
        document.querySelector(".comp").removeChild(card);
      } else {
        document.querySelector(".not-comp").removeChild(card);
      }
    });

    divElement.appendChild(checkBoxInput);
    divElement.appendChild(item);
    divElement.appendChild(delButton);

    if (card.classList.contains("checked")) {
      card.appendChild(divElement);

      document.querySelector(".comp").appendChild(card);
    } else {
      card.appendChild(divElement);

      document.querySelector(".not-comp").appendChild(card);
    }
  });
}

//checkbox
async function stateTodo(id, completed) {
  const state = {
    isCompleted: completed,
  };

  await fetch("http://localhost:5000/todos/" + id, {
    method: "PUT",
    body: JSON.stringify(state),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
}

async function deleteTodo(id) {
  await fetch("http://localhost:5000/todos/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });
}
