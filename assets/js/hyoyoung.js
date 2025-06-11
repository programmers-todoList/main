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

// 모달 관련 요소 선택
const modalBackdrop = document.querySelector(".modal-backdrop"); // 모달 뒤.
const modal = modalBackdrop.querySelector(".modal"); // 모달.
const submitBtn = document.querySelector(".submitDate"); // 날짜 제출 버튼.
const yearInput = document.getElementById("year"); // 연도 인풋.
const monthInput = document.getElementById("month"); // 월 인풋.
const dayInput = document.getElementById("day"); // 일 인풋.

/* ----------------------------------- 함수 및 이벤트트 ----------------------------------- */
// 할 일 추가 이벤트.
addButton.addEventListener("click", () => {
  const text = input.value.trim(); // 앞 뒤 공백 제거.
  if (!text) return;

  if (currentMode === "daily") {
    hyoTodos.daily.push({ text, done: false }); // 데일리 푸시.
    saveToLocalStorage();
    renderTodos();
    input.value = "";
  } else if (currentMode === "task") {
    openModal(); // 모달 오픈.
  }
});

// 모드에 따른 리스트 랜더링 함수.
function renderTodos() {
  list.innerHTML = ""; // 항상 초기화
  if (currentMode === "daily") {
    renderDailyTodos();
    input.placeholder = " 기다리고 있었어요🔥 오늘은 무엇을 해야 하나요?🤔";
  } else if (currentMode === "task") {
    renderTaskTodos();
    input.placeholder = " 새로운 목표가 있나요❓ 벌써 기대돼요!✌️"; // Task 모드용 placeholder
  }
}

// 데일리 랜더 함수.
function renderDailyTodos() {
  hyoTodos.daily.forEach((item, index) => {
    const li = document.createElement("li"); //li 태그그 하나 만들기.
    li.className = "todo-list-element"; // 클래스 삽입.
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
    list.appendChild(li); // 리스트 추가.
  });
}

// 태스크 랜더 함수.
function renderTaskTodos() {
  hyoTodos.task.sort((a, b) => {
    // 디데이가 짧은 순으로 정렬.
    const dDayA = calculateDday(a.deadline);
    const dDayB = calculateDday(b.deadline);
    return dDayA - dDayB;
  });

  list.innerHTML = "";
  hyoTodos.task.forEach((item, index) => {
    const dDay = calculateDday(item.deadline); // 디데이 계산 함수 호출해서 디데이 계산해오기.
    const li = document.createElement("li"); // li 태그 생성.
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
    list.appendChild(li); //리스트 추가.
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
    saveToLocalStorage(); // 삭제 후 로컬스토리지에 저장.
    renderTodos(); // 새로고침.
  }
});

// 데일리 전용 - 할 일 완료.
list.addEventListener("change", (e) => {
  if (e.target.matches(".todo-list-element-checkbox")) {
    const checkbox = e.target;
    const index = checkbox.dataset.index;
    const li = checkbox.closest(".todo-list-element");
    const span = li.querySelector("span");
    span.classList.toggle("clear", checkbox.checked); // clear 클래스 추가. = 클리어 처리(디자인)

    if (currentMode === "daily") {
      hyoTodos.daily[index].done = checkbox.checked;
      saveToLocalStorage();
      renderTodos();
    }
  }
});

// 토글 전환 이벤트.
toggle.addEventListener("click", () => {
  if (currentMode === "daily") {
    currentMode = "task";
    toggle.className = "todo-toggle-task"; // 모드에 따른 클래스 변경.
    toggle.dataset.mode = "task";
    toggle.textContent = "Task";
  } else {
    currentMode = "daily";
    toggle.className = "todo-toggle-daily"; // 모드에 따른 클래스 변경.
    toggle.dataset.mode = "daily";
    toggle.textContent = "Daily";
  }

  renderTodos(); // 새로 고침.
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

// 모달 열기 함수
function openModal() {
  modalBackdrop.classList.add("show");
  modalBackdrop.setAttribute("aria-hidden", "false"); // 모달이 열리면 스크린리더에게 읽혀야 하기 때문에 속성을 변경.
  document.body.style.overflow = "hidden"; // 모달이 떠있는동안 뒷 배경이 스크롤 되는것을 방지.
}

// 모달 닫기 함수
function closeModal() {
  modalBackdrop.classList.remove("show");
  modalBackdrop.setAttribute("aria-hidden", "true"); // 모달이 닫기면 스크린리더에게 보이지 않아함.
  document.body.style.overflow = "auto"; // 스크롤 다시 복구.
  clearModalInputs(); // 입력 필드 초기화.
}

// 입력 필드 초기화
function clearModalInputs() {
  yearInput.value = "";
  monthInput.value = "";
  dayInput.value = "";
}

// 모달 외부 클릭 감지
modalBackdrop.addEventListener("click", (e) => {
  // 모달의 전체 영역을 불러고
  if (!modal.contains(e.target)) {
    // 모달이 아닌곳을 클릭하면 모달 닫기.
    closeModal();
  }
});

// 날짜 유효성 검사
function isValidDate(y, m, d) {
  const parsed = new Date(y, m - 1, d); //JS에서 월은 0부터 시작함. 즉 0 = 1월을 의미함. 따라서 -1을 해야 함.
  return (
    // JS Date 객체는 날짜 보정을 자동으로 해준다. 예) 2025 1 30이 입력되면 보정이 되어서 2025 3 02가 된다. (2월은 28일까지)
    parsed.getFullYear() === y && // 따라서 입력된 날짜가 유효한지 확인하는 절차가 꼭 필요하다.
    parsed.getMonth() === m - 1 &&
    parsed.getDate() === d
  );
}

// 날짜 제출 처리
submitBtn.addEventListener("click", () => {
  const y = parseInt(yearInput.value, 10); // 10진수라고 써주는게 좋은 습관이라고 함.
  const m = parseInt(monthInput.value, 10); // 일부 브라우저는 8진수로 이해하는 경우도 있다고 함.
  const d = parseInt(dayInput.value, 10);

  if (!isValidDate(y, m, d)) {
    // 유저가 입력한 날짜가 유효한지 검사.
    // 날짜 유효성 검사 함수 호출.
    alert("유효한 날짜를 입력해주세요.");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // 00시00분으로 맞춰야 동등 비교가 가능하다.
  const deadline = new Date(y, m - 1, d);

  if (deadline < today) {
    // 오늘보다 이전인 날짜는 디데이를 설정하는 의미가 없다.
    // 이전 날짜를 선택 할 수 없음.
    alert("오늘보다 이전 날짜는 사용할 수 없습니다.");
    return;
  }

  const text = input.value.trim(); // 메인 인풋의 밸류를 담음.
  if (!text) return;

  hyoTodos.task.push({ text, deadline: deadline.toISOString().split("T")[0] }); // 메인 인풋의 밸류 = 할 일 과 날짜를 짝지어서 저장.
  saveToLocalStorage();
  renderTodos(); // 새로고침.

  input.value = ""; // 메인 인풋 필드 초기화.
  closeModal(); // 모달 닫기.
});

// 디데이가 지난 함수 삭제.
function purgeExpiredTasks() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const before = hyoTodos.task.length;

  hyoTodos.task = hyoTodos.task.filter((item) => {
    const deadline = new Date(item.deadline);
    return deadline >= today;
  });

  if (hyoTodos.task.length < before) {
    saveToLocalStorage();
  }
}

/* ------------------------------------ - ----------------------------------- */
// 로컬에 저장되어있는 할 일 목록 가져오기.
loadFromLocalStorage();
purgeExpiredTasks(); // 디데이가 오버된 할일 제거 함수 호출.
renderTodos();
