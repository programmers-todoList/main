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
  newTodo.style["visibility"] = "visible";
}

// 2. li 작성하고 완료 누르면 li 생성
// 태그(이름,색)->태그만들기
// 날짜->d-day로 변환
// 완료->수정
function getDday(date) {
  if (!date) return;
  console.log(date);
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

function getMainTodoClassName(startNode) {
  let nextNode;
  nextNode = startNode;
  do {
    nextNode = nextNode.parentElement;
  } while (nextNode.nodeName !== "DIV" && nextNode.className !== subTodo);
  return nextNode["className"];
}

function setMainTodoLi(data, className) {
  console.log(data);
  let color = data["tagColor"];
  let done = data["done"];
  let tag;
  if (className === undefined)
    tag = document.querySelector(`.newTodo_li${localStorage.length} .tagUI`);
  else tag = document.querySelector(`.${className} .tagUI`);
  tag.style["background-color"] = color + "4D";
  tag.style["border"] = "2px solid" + color;
  tag.firstElementChild.style["background-color"] = color;
  tag.lastChild.textContent = data["tag"] !== "" ? data["tag"] : "태그없음";
  tag.nextElementSibling.textContent = getDday(data["endDate"]);
  let todo = tag.nextElementSibling.nextElementSibling;
  todo.value = data["todo"];
  todoInfo = todo.nextElementSibling;
  if (done) {
    todo.style["text-decoration"] = "line-through";
    todoInfo.style["text-decoration"] = "line-through";
    tag.parentElement.parentElement.style["background-color"] = "#d9d9d9";
    todo.style["background-color"] = "#d9d9d9";
    todoInfo.style["background-color"] = "#d9d9d9";
  } else {
    todo.style["text-decoration"] = "none";
    todoInfo.style["text-decoration"] = "none";
    tag.parentElement.parentElement.style["background-color"] = "#ffffff";
    todo.style["background-color"] = "#ffffff";
    todoInfo.style["background-color"] = "#ffffff";
  }
  todoInfo.value = data["todoInfo"];
}
// function setSubTodoLi(data, main) {
//   console.log(data);
//   let todo = document.querySelector(
//     `.newTodo_li${Object.keys(todo[main]).length} .todo`
//   );
//   todo.value = data["todo"];
//   todo.nextElementSibling.value = data["todoInfo"];
//   let dDay = document.querySelector(
//     `.newTodo_li${Object.keys(todo[main]).length} .todo`
//   )

//   tag.lastChild.textContent = data["tag"] === "" ? data["tag"] : "태그없음";
//   tag.nextElementSibling.textContent = getDday(data["endDate"]);
//   tag.nextElementSibling.nextElementSibling.value = data["todo"];
//   tag.nextElementSibling.nextElementSibling.nextElementSibling.value =
//     data["todoInfo"];
// }

function getAddData(formId) {
  let data = {};
  data["done"] = false;
  let form = document.querySelector(`#${formId}`).elements;
  for (element of form) {
    data[element["name"]] = element.value;
  }
  return data;
}

function createNewTodo() {
  let data = getAddData("mainForm");
  console.log(data);
  if (data["todo"] === "") alert("할일을 입력해주세요");
  else {
    let newTodo = document.querySelector(".newTodo");
    newTodo.style["visibility"] = "hidden";
    localStorage.setItem(
      `newTodo_li${localStorage.length + 1}`,
      JSON.stringify(data)
    );
    const todo_li = document.querySelector(".todo_li");
    const newTodo_li = todo_li.cloneNode(true);

    newTodo_li.className = "newTodo_li" + localStorage.length;
    todo_li.before(newTodo_li);

    setMainTodoLi(data);
  }
}

// function createNewSubTodo(node) {
//   let mainTodoClassName = getMainTodoClassName(node);
//   let data = getAddData("subForm");
//   if (data["todo"] === "") alert("세부할일을 입력해주세요");
//   else {
//     todo[mainTodoClassName][subTodo].push(data);
//     const subTodoDiv = document.querySelector(".subTodo");
//     const newSubTodoDiv = subTodoDiv.cloneNode(true);
//     subTodoDiv.before(newSubTodoDiv);

//     setSubTodoLi(data, mainTodoClassName);
//   }
// }

// 3. 삭제 누르면 삭제
function deleteTodo(li) {
  let liToRemove = getLi(li);
  localStorage.removeItem(liToRemove["className"]);
  liToRemove.remove();
  console.log(localStorage.length);
  if (localStorage.length === 0) {
    let nothingTodo = document.querySelector(".nothingTodo");
    nothingTodo.style["display"] = "block";
  }
}
// 4. 할일 누르면 완료/미완료료처리
function completeTodo(li) {
  let liToComplete = getLi(li)["className"];
  let change = JSON.parse(localStorage.getItem(liToComplete));
  change["done"] = !change["done"];
  setMainTodoLi(change, liToComplete);
  localStorage.setItem(liToComplete, JSON.stringify(change));
  console.log(JSON.parse(localStorage.getItem(liToComplete)));
}

// 5. 세부할일 누르면 수정 가능하게
// 새로운 세부할일 만드는거는 항상 가능하게
// 등록누르면 맨 밑에 새로운 새부할일만드는거 추가되게
