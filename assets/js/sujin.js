class AddNewTodoButton {
  constructor({ input, button, newButton, li }) {
    this.input = document.querySelector(input);
    this.button = document.querySelector(button);
    this.newButton = document.querySelector(newButton);
    this.li = document.querySelector(li);
    this.attachEvent();
  }

  get inputValue() {
    let elements = this.input.elements;
    let data = { done: false };
    for (const element of elements) {
      data[element["name"]] = element.value;
    }
    return data;
  }

  setInfo() {
    this.input.children[4].value = "할일은 필수입력값입니다";
    this.input.children[4].style.color = "red";
    this.button.disabled = true;
    setTimeout(() => {
      this.input.children[4].value = "";
      this.input.children[4].style.color = "black";
      this.button.disabled = false;
    }, 2000);
  }

  dDay(date) {
    if (!date) return;
    const today = new Date();
    let endDate = new Date(date);
    endDate.setHours(0, 0, 0, 0);
    let dday = endDate - today;
    dday = Math.ceil(dday / (1000 * 60 * 60 * 24));
    if (dday < 0) return `D+${-dday}`;
    else if (dday === 0) return "D-day";
    else return `D-${dday}`;
  }
  newTodo(inputValue, key) {
    let todoNumber;
    if (key) todoNumber = key;
    else todoNumber = "sujinTodo" + localStorage.getItem("sujin_count");
    let dDay = this.dDay(inputValue.endDate) ?? "";
    if (!inputValue.tag) inputValue.tag = "태그없음";
    let templete =
      /*html*/
      `<li class=${todoNumber}>
        <div class="mainTodo">
          <button type="button" class="todoForm" onclick="completeTodo('${todoNumber}')">
              <div class="tagUI" style='background-color: ${inputValue.tagColor}4D; border: 2px solid ${inputValue.tagColor};'>
                <div class="circle" style="background-color: ${inputValue.tagColor}"></div>
                ${inputValue.tag}
              </div>
              <span class="dDay">${dDay}</span>
              <input class="todo" type="text" required readonly value="${inputValue.todo}"/>
              <input type="text" readonly value="${inputValue.todoInfo}"/>
          </button>
          <div class="todoButtons">
            <button
              type="button"
              class="deleteButton"
              onclick="deleteTodo('${todoNumber}')"
            >
              <span>삭제</span>
            </button>
          </div>
        </div>
      </li>`;
    return templete;
  }
  #render(key) {
    let data;
    if (key) data = JSON.parse(localStorage.getItem(key));
    else data = this.inputValue;
    if (data.todo === "") {
      this.setInfo();
      return;
    }
    this.li.insertAdjacentHTML("beforebegin", this.newTodo(data, key));
    this.li.style["display"] = "none";
    this.input.reset();
    this.newButton.disabled = false;
  }
  handleClick(key) {
    key ? this.#render(key) : this.#render();
  }
  addToData() {
    let data = this.inputValue;
    if (data.todo === "") return;
    let count = localStorage.getItem("sujin_count") ?? 0;
    localStorage.setItem("sujin_count", ++count);
    localStorage.setItem("sujinTodo" + count, JSON.stringify(data));
  }
  attachEvent() {
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      this.addToData();
      this.handleClick();
    });
  }
}

const addTodo = new AddNewTodoButton({
  input: "#mainForm",
  button: ".submitButton",
  newButton: ".addTodoButton",
  li: ".newTodo",
});

init();

function init() {
  if (localStorage.length !== 0) {
    let nothingTodo = document.querySelector(".nothingTodo");
    nothingTodo.style["display"] = "none";
  }
  for (key of Object.keys(localStorage)) {
    if (key !== "sujin_count") addTodo.handleClick(key);
  }
}

// 1. 할일추가하기 버튼 누르면  todo추가 li 보이게하기기
function createNewTodoForm() {
  let newTodo = document.querySelector(".newTodo");
  let nothingTodo = document.querySelector(".nothingTodo");
  nothingTodo.style["display"] = "none";
  newTodo.style["display"] = "block";
  let newButton = document.querySelector(".addTodoButton");
  newButton.disabled = true;
}

// 2. 취소누르면 todo새로만들기 취소
function cancelToCreate() {
  let newTodo = document.querySelector(".newTodo");
  newTodo.style["display"] = "none";
  let newButton = document.querySelector(".addTodoButton");
  newButton.disabled = false;
}

// 3. 삭제 누르면 삭제
function deleteTodo(li) {
  localStorage.removeItem(li);
  document.querySelector(`.${li}`).remove();
  if (localStorage.length === 1) {
    let nothingTodo = document.querySelector(".nothingTodo");
    nothingTodo.style["display"] = "block";
    localStorage.setItem("sujin_count", 0);
  }
}
// 4. 할일 누르면 완료/미완료처리
function completeTodo(li) {
  let change = JSON.parse(localStorage.getItem(li));
  change["done"] = !change["done"];
  let done = change["done"];
  let todoForm = document.querySelector(`.${li}` + " .todoForm");
  let todo = todoForm.children[2];
  let todoInfo = todoForm.children[3];
  if (done) {
    todo.style["text-decoration"] = "line-through";
    todo.style["background-color"] = "#d9d9d9";
    todoInfo.style["text-decoration"] = "line-through";
    todoInfo.style["background-color"] = "#d9d9d9";
    todoForm.style["background-color"] = "#d9d9d9";
  } else {
    todo.style["text-decoration"] = "none";
    todo.style["background-color"] = "#ffffff";
    todoInfo.style["text-decoration"] = "none";
    todoInfo.style["background-color"] = "#ffffff";
    todoForm.style["background-color"] = "#ffffff";
  }
  localStorage.setItem(li, JSON.stringify(change));
}
