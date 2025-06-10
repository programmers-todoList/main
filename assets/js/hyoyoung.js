/* ----------------------------------- 변수 ----------------------------------- */
let currentMode = "daily"; // 현재 상태: 'daily' 또는 'task'
const hyoTodos = {
  daily: [],
  task: [],
};
const input = document.querySelector(".todo-input"); // 할 일 입력 창.
const addButton = document.querySelector(".todo-addBtn"); // 할 일 생성 버튼.
const list = document.querySelector(".todo-list"); // 양산형 리스트.
const toggle = document.querySelector(".todo-toggle-daily, .todo-toggle-task"); // 토글.

/* ----------------------------------- 함수 및 이벤트트 ----------------------------------- */
// 할 일 추가 이벤트.
addButton.addEventListener("click", () => {
  const text = input.value.trim(); // 앞 뒤 공백 제거.
  if (!text) return;

  if (currentMode === "daily") {
    hyoTodos.daily.push({ text, done: false }); // 데일리 푸시.
  } else if (currentMode === "task") {
    let deadline;
    while (true) {
      deadline = prompt("마감일을 YYYY-MM-DD 형식으로 입력하세요");
      if (deadline === null) return;

      const parsed = new Date(deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 자정 기준 비교. parsed에는 일자는 같지만 시간 때문에 동등 비교가 어려움. 그래서 시간을 통일시켜 줌.
      if (deadline.trim() === "" || isNaN(parsed)) {
        alert("유효한 날짜를 입력해주세요.");
        continue;
      }
      if (parsed < today) {
        alert("오늘보다 이전 날짜는 사용할 수 없습니다.");
        continue;
      }
      break; // 정상적인 날짜일 경우 반복 종료.
    }

    hyoTodos.task.push({ text, deadline }); // 태스크 푸시.
  }

  saveToLocalStorage();
  renderhyoTodos();
  input.value = "";
});

// 모드에 따른 리스트트 랜더링 함수.
function renderhyoTodos() {
  list.innerHTML = ""; // 항상 초기화
  if (currentMode === "daily") {
    renderDailyhyoTodos();
    input.placeholder = " 기다리고 있었어요🔥 오늘은 무엇을 해야 하나요?🤔";
  } else if (currentMode === "task") {
    renderTaskhyoTodos();
    input.placeholder = " 새로운 목표가 있나요❓ 벌써 기대돼요✌️"; // Task 모드용 placeholder
  }
}

// 데일리 랜더 함수.
function renderDailyhyoTodos() {
  hyoTodos.daily.forEach((item, index) => {
    // hyoTodos.daily에 있는 할 일을 하나씩 뽑아서 list에 append.
    const li = document.createElement("li");
    li.className = "todo-list-element";
    li.innerHTML = /* html */ `
      <input type="checkbox" class="todo-list-element-checkbox" data-index="${index}" ${
      item.done ? "checked" : ""
    } />
      <span class="${item.done ? "clear" : ""}">${item.text}</span>
      <button class="todo-list-element-delete" data-index="${index}" aria-label="삭제">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
            fill="#202632"/>
        </svg>
      </button>
    `;
    list.appendChild(li);
  });
}

// 태스크 렌더 함수.
function renderTaskhyoTodos() {
  // D-day를 기준으로 오름차순 정렬.
  hyoTodos.task.sort((a, b) => {
    const dDayA = calculateDday(a.deadline);
    const dDayB = calculateDday(b.deadline);
    return dDayA - dDayB; // 오름차순 정렬
  });

  list.innerHTML = ""; // 클리어.

  hyoTodos.task.forEach((item, index) => {
    const dDay = calculateDday(item.deadline);
    const li = document.createElement("li");
    li.className = "todo-list-element";
    li.innerHTML = /* html */ `
      <span class="todo-list-element-D_day">D-${dDay}</span>
      <span>${item.text}</span>
      <button class="todo-list-element-delete" data-index="${index}" aria-label="삭제">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_26_8)">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z" fill="#0050c7"/>
          </g>
          <defs>
            <clipPath id="clip0_26_8">
              <rect width="24" height="24" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    `;
    list.appendChild(li);
  });
}

// 디데이 계산 함수.
function calculateDday(dateStr) {
  const today = new Date(); // 오늘 날짜 받아오기.
  const deadline = new Date(dateStr); // 마감 날짜 담기.
  const diffTime = deadline - today; // 디데이 계산.
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

// 할 일 삭제.
list.addEventListener("click", (e) => {
  if (e.target.closest(".todo-list-element-delete")) {
    const index = e.target.closest("button").dataset.index;
    if (currentMode === "daily") {
      hyoTodos.daily.splice(index, 1);
    } else if (currentMode === "task") {
      hyoTodos.task.splice(index, 1);
    }
    saveToLocalStorage(); // 삭제 후에는 로컬 스토리지 저장.
    renderhyoTodos(); // 새로고침.
  }
});

// 할 일 체크 이벤트
list.addEventListener("change", (e) => {
  const checkbox = e.target;
  if (checkbox.matches(".todo-list-element-checkbox")) {
    const li = checkbox.closest(".todo-list-element");
    const span = li.querySelector("span"); // 같은 li 안의 span 찾기
    span.classList.toggle("clear", checkbox.checked);
  }
});

// 데일리 전용 - 할 일 완료.
list.addEventListener("change", (e) => {
  if (e.target.matches(".todo-list-element-checkbox")) {
    const index = e.target.dataset.index;
    hyoTodos.daily[index].done = e.target.checked; // 체크 박스의 여부를 스토리지에 반영.
    saveToLocalStorage(); //로컬 스토리지 저장.
    renderhyoTodos(); // 새로고침.
  }
});

// 토글 전환 이벤트.
toggle.addEventListener("click", () => {
  if (currentMode === "daily") {
    currentMode = "task";
    toggle.className = "todo-toggle-task";
    toggle.dataset.mode = "task";
    toggle.textContent = "Task";
  } else {
    currentMode = "daily";
    toggle.className = "todo-toggle-daily";
    toggle.dataset.mode = "daily";
    toggle.textContent = "Daily";
  }

  renderhyoTodos(); // 새로고침.
});

// 로컬 스토리지에 할 일 저장 함수.
function saveToLocalStorage() {
  localStorage.setItem("hyoTodos", JSON.stringify(hyoTodos));
}

// 로컬 스토리지 불러오기.
function loadFromLocalStorage() {
  const data = localStorage.getItem("hyoTodos");
  if (data) {
    const parsed = JSON.parse(data);
    hyoTodos.daily = parsed.daily || [];
    hyoTodos.task = parsed.task || [];
  }
}

/* ------------------------------------ - ----------------------------------- */
// 마운트라고 하나?
loadFromLocalStorage(); // 브라우저가 js 파일 실행시 호출되게 끔.
renderhyoTodos(); // 브라우저가 js 파일 실행시 호출되게 끔.
