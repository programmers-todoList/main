// 할 일 목록 배열
let todos = [];

// 할 일 항목(li) 생성 함수
function createItem(value, id) {
  return `<li data-id="${id}">${value}
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

// 할 일 삭제
function handleRemove(e) {
  if (e.target.classList.contains("delete")) {
    const li = e.target.closest("li");
    const id = Number(li.dataset.id);
    todos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
    li.remove();
  }
}

// DOM 요소 선택
const input = document.getElementById("todo_input");
const button = document.getElementById("add_button");
const ul = document.getElementById("todo_list");

ul.addEventListener("click", handleRemove);

// 버튼 클릭 이벤트
button.addEventListener("click", () => {
  if (input.value.trim() === "") return; // 빈 입력 방지

  // 고유 ID 생성 
  const id = Date.now();

  // 할 일 추가
  renderItem({
    target: ul,
    value: input.value,
    id: id,
  });

  input.value = ""; // 입력창 초기화
});

