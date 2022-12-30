let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  //prevent form from being submitted
  e.preventDefault();

  //get input values
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDate = form.children[2].value;

  //to do text input 不為空
  if (todoText == "") {
    alert("Please enter some text!");
    return;
  }

  //create todo item
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + " / " + todoDate;
  todo.appendChild(text);
  todo.appendChild(time);

  //create green check and red trash can icon
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
  //做完to do item事件
  completeButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.classList.toggle("done"); //toggle 轉換check鍵由class中判斷是否有"done'
  });

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("trash");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  //刪除 to do item事件
  deleteButton.addEventListener("click", (e) => {
    let deleteItem = e.target.parentElement;
    //remove from localstorage
    let text = deleteItem.children[1].innerText;
    let myListArray = JSON.parse(localStorage.getItem("list"));
    myListArray.forEach((item, index) => {
      if (item.todoText == text) {
        myListArray.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(myListArray));
      }
    });
    //當動畫跑完後，將todo item刪除
    deleteItem.addEventListener("animationend", () => {
      deleteItem.remove();
    });

    deleteItem.style.animation = "scaledown 0.4s forwards";
  });
  //todo item <div>
  todo.appendChild(completeButton);
  todo.appendChild(text);
  todo.appendChild(time);
  todo.appendChild(deleteButton);

  todo.style.animation = "scaleUp 0.5s forwards";

  //store data into localstorage
  //create an object
  let mytodo = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDate: todoDate,
  };

  //store data into an arry of object
  let myList = localStorage.getItem("list");
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([mytodo]));
  } else {
    let myListArray = JSON.parse(myList);
    myListArray.push(mytodo);
    localStorage.setItem("list", JSON.stringify(myListArray));
  }

  form.children[0].value = ""; //當按下add into list，清空to do text input

  //todo item put into section
  section.appendChild(todo);
});

let myList = localStorage.getItem("list");
if (myList !== null) {
  let myListArray = JSON.parse(myList);
  myListArray.forEach((item) => {
    //create a to do
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.innerText = item.todoText;
    text.classList.add("todo-text");

    let time = document.createElement("p");
    time.innerText = item.todoMonth + " / " + item.todoDate;
    time.classList.add("todo-time");

    //create green check and red trash can icon
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    //做完to do item事件
    completeButton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      todoItem.classList.toggle("done"); //toggle 轉換check鍵由class中判斷是否有"done'
    });

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("trash");
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    //刪除 to do item事件
    deleteButton.addEventListener("click", (e) => {
      let deleteItem = e.target.parentElement; //<an to do item <div>

      //當動畫跑完後，將todo item刪除
      deleteItem.addEventListener("animationend", () => {
        //remove from localstorage
        let text = deleteItem.children[1].innerText;
        let myListArray = JSON.parse(localStorage.getItem("list"));
        myListArray.forEach((item, index) => {
          if (item.todoText == text) {
            myListArray.splice(index, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
        //remove TO DO ITEM from HTML
        deleteItem.remove();
      });
      deleteItem.style.animation = "scaledown 0.4s forwards";
    });

    todo.appendChild(completeButton);
    todo.appendChild(text);
    todo.appendChild(time);
    todo.appendChild(deleteButton);
    section.appendChild(todo);
  });
}
