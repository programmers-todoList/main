init();

function init() {
  if (Object.keys(localStorage).length !== 0) {
    let nothingTodo = document.querySelector(".nothingTodo");
    nothingTodo.style["display"] = "none";
  }

  for (key of Object.keys(localStorage)) {
    const todo_li = document.querySelector(".todo_li");
    const newTodo_li = todo_li.cloneNode(true);
    newTodo_li.className = key;
    todo_li.before(newTodo_li);
    let data = JSON.parse(localStorage.getItem(key));
    setMainTodoLi(data, key);
  }
}

// 1. 할일추가하기 버튼 누르면 새로운 li 만들어지게
function createNewTodoForm() {
  document.querySelector("#mainForm").reset();

  let newTodo = document.querySelector(".newTodo");

  let nothingTodo = document.querySelector(".nothingTodo");

  nothingTodo.style["display"] = "none";
  newTodo.style["display"] = "block";
}

// 2. li 작성하고 완료 누르면 li 생성
// 태그(이름,색)->태그만들기
// 날짜->d-day로 변환
// 완료->수정
function getDday(date) {
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

function getLi(startNode) {
  let nextNode;
  nextNode = startNode;
  do {
    nextNode = nextNode.parentElement;
  } while (nextNode.nodeName !== "LI");
  return nextNode;
}

function setMainTodoLi(data, className, editDone) {
  let color = data["tagColor"];
  let done = data["done"];
  let tag;
  if (className === undefined || className === "")
    tag = document.querySelector(`.newTodo_li${localStorage.count} .tagUI`);
  else tag = document.querySelector(`.${className} .tagUI`);
  let todo = tag.nextElementSibling.nextElementSibling;
  let todoInfo = todo.nextElementSibling;

  if (!editDone) {
    tag.style["background-color"] = color + "4D";
    tag.style["border"] = "2px solid" + color;
    tag.firstElementChild.style["background-color"] = color;
    tag.lastChild.textContent = data["tag"] !== "" ? data["tag"] : "태그없음";
    tag.nextElementSibling.textContent = getDday(data["endDate"]);
    todo.value = data["todo"];
    todoInfo.value = data["todoInfo"];
  }

  if (done) {
    todo.style["text-decoration"] = "line-through";
    todo.style["background-color"] = ["#d9d9d9"];
    todoInfo.style["text-decoration"] = "line-through";
    todoInfo.style["background-color"] = ["#d9d9d9"];
    tag.parentElement.parentElement.style["background-color"] = "#d9d9d9";
  } else {
    todo.style["text-decoration"] = "none";
    todo.style["background-color"] = ["#ffffff"];
    todoInfo.style["text-decoration"] = "none";
    todoInfo.style["background-color"] = ["#ffffff"];
    tag.parentElement.parentElement.style["background-color"] = "#ffffff";
  }
}

function getAddData() {
  let data = {};
  data["done"] = false;
  let form = document.querySelector(`#mainForm`).elements;
  for (element of form) {
    data[element["name"]] = element.value;
  }
  return data;
}

function createNewTodo() {
  let data = getAddData();
  if (data["todo"] === "") alert("할일을 입력해주세요");
  else {
    let newTodo = document.querySelector(".newTodo");
    newTodo.style["display"] = "none";
    localStorage.length === 0
      ? localStorage.setItem("count", 1)
      : localStorage.setItem("count", +localStorage.getItem("count") + 1);
    localStorage.setItem(
      `newTodo_li${localStorage.getItem("count")}`,
      JSON.stringify(data)
    );
    const todo_li = document.querySelector(".todo_li");
    const newTodo_li = todo_li.cloneNode(true);

    newTodo_li.className = "newTodo_li" + localStorage.getItem("count");
    todo_li.before(newTodo_li);

    setMainTodoLi(data, "", false);
  }
}

// 3. 삭제 누르면 삭제
function deleteTodo(li) {
  let liToRemove = getLi(li);
  localStorage.removeItem(liToRemove["className"]);
  liToRemove.remove();
  if (localStorage.length === 1) {
    let nothingTodo = document.querySelector(".nothingTodo");
    nothingTodo.style["display"] = "block";
    localStorage.setItem("count", 0);
  }
}
// 4. 할일 누르면 완료/미완료료처리
function completeTodo(li) {
  let liToComplete = getLi(li)["className"];
  let change = JSON.parse(localStorage.getItem(liToComplete));
  change["done"] = !change["done"];
  setMainTodoLi(change, liToComplete, true);
  localStorage.setItem(liToComplete, JSON.stringify(change));
}
