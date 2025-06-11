// 전역 변수 선언
const input = document.getElementById('whatTodo');
const list = document.getElementById('listItem');
const beer = document.querySelector('.countBeer .beer');
const foam1 = document.querySelector('.countBeer .foam1');
const foam2 = document.querySelector('.countBeer .foam2');


// 입력된 할 일 처리
function inputItem() {
  const text = input.value.trim();

  if (text === '') {
    alert('공주님 할 일을 입력하셔야 합니다!');
    return;
  }

  const li = createItem(text);
  renderItem(li, list);
  pourBeer();
  input.value = '';
  saveLocal();
}

// li 생성
function createItem(text, done = false) {
  const li = document.createElement('li');
  const checkButton = createCheckButton(li);
  const removeButton = createRemoveButton(li);
  const textSpan = document.createElement('span');

  textSpan.textContent = text;
  if (done) li.classList.add('done');

  li.append(checkButton, textSpan, removeButton);
  return li;
}

// 체크버튼
function createCheckButton(li) {
  const checkButton = document.createElement('button');
  checkButton.classList.add('checkButton');
  checkButton.type = 'button';
  checkButton.addEventListener('click', () => {
    doneItem(li);
    saveLocal();
  });

  return checkButton;
}

// 삭제버튼
function createRemoveButton(li) {
  const removeButton = document.createElement('button');
  removeButton.classList.add('removeButton');
  removeButton.type = 'button';
  removeButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391
                                  5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304
                                  22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19
                                  20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086
                                  8.58579 2.58579C8.96086 2.21071 9.46957 2 10
                                  2H14C14.5304 2 15.0391 2.21071 15.4142
                                  2.58579C15.7893 2.96086 16 3.46957 16 4V6"
                            stroke="#FFB224" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round"/>
                        </svg>`;

  removeButton.addEventListener('click', () => {
    removeItem(li);
  });

  return removeButton;
}

// li 배치
function renderItem(li, list) {
  list.append(li);
}

// li 제거
function removeItem(li) {
  li.remove();
  pourBeer();
  saveLocal(); // 삭제 후 저장
}

// 완료 체크
function doneItem(li) {
  li.classList.toggle('done');
  pourBeer();
}

// 완료 비율 계산
function doneCount() {
  const total = list.querySelectorAll('li').length;
  const done = list.querySelectorAll('li.done').length;
  const height = Math.ceil((done / total) * 84);

  return [total, done, height];
}

// 맥주 채우기
function pourBeer() {
  const [total, done, height] = doneCount();

  if (total === 0) {
    beer.style.height = '0px';
    foam1.style.display = 'none';
    foam2.style.display = 'none';
    return;
  }

  beer.style.height = `${height}px`;
  foam1.style.display = (done === total) ? 'block' : 'none';
  foam2.style.display = (done === total) ? 'block' : 'none';
}

// localStorage에 저장
function saveLocal() {
  const saveLists = [];

  list.querySelectorAll('li').forEach((li) => {
    saveLists.push({
      text: li.querySelector('span').textContent,
      done: li.classList.contains('done'),
    });
  });

  localStorage.setItem('uhaTodoList', JSON.stringify(saveLists));
}

// localStorage에 저장된 리스트를 불러오는 함수
function loadLocal() {
  const savedLists = localStorage.getItem('uhaTodoList');
  if (!savedLists) return;

  const loadLists = JSON.parse(savedLists);

  loadLists.forEach(({ text, done}) => {
    const li = createItem(text, done);
    renderItem(li, list);
  });

  pourBeer();
}

document.addEventListener('DOMContentLoaded', () => {
  loadLocal();
});