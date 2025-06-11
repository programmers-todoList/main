// 할 일 목록 배열
let todos = [];

// 할 일 항목(li) 생성 함수
function createItem(value, id) {
  return `<li data-id="${id}">
    <label class="checkbox">
      <input type="checkbox">
      <span class="checkbox_icon"></span>
    </label>
    ${value}
    <button class="delete" type="button">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H21M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6M10 11V17M14 11V17"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                삭제
              </button>
  </li>`;
}

// 할 일 항목을 ul에 추가하는 함수
function renderItem({ target, value, id }) {
  const li = createItem(value, id);
  target.insertAdjacentHTML("beforeend", li);
}

// 할 일 항목 제거 및 배열, localStorage 업데이트
function handleRemove(e) {
  // .delete 클래스가 있는 요소(삭제 버튼)만 처리
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li"); // 버튼의 부모 li 찾기
    const id = Number(li.dataset.id);
    // 배열에서 해당 id 삭제
    todos = todos.filter((todo) => todo.id !== id);
    // localStorage 업데이트
    localStorage.setItem("todos", JSON.stringify(todos));
    // DOM에서 삭제
    li.remove();
  }
}

// 페이지 로드 시 실행
function init() {
  const input = document.getElementById("todo_input");
  const button = document.getElementById("add_button");
  const ul = document.getElementById("todo_list");

  // localStorage에서 할 일 목록 불러오기
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    // 목록 렌더링
    todos.forEach((todo) => {
      renderItem({ target: ul, value: todo.value, id: todo.id });
    });
  }

  // ul에 클릭 이벤트 등록 (항목 삭제)
  ul.addEventListener("click", handleRemove);

  // 추가 버튼 클릭 이벤트
  button.addEventListener("click", () => {
    if (input.value.trim() === "") return;
    // 고유 ID 생성 
    const id = Date.now();
    todos.push({ id, value: input.value });
    localStorage.setItem("todos", JSON.stringify(todos));
    // 할 일 추가
    renderItem({ target: ul, value: input.value, id });
    input.value = ""; // 입력창 초기화
  });
}

// DOM이 로드된 후 init 실행
document.addEventListener("DOMContentLoaded", init);
