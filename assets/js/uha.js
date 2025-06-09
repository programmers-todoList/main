// addButton 누르면 실행되는 함수
function inputItem() {
  const input = document.getElementById('whatTodo');
  const list = document.getElementById('listItem');
  const text = input.value.trim();

  // 만약 input 창에 아무것도 입력되지 않았다면면
  if (text === '') {
    alert('공주님 할 일을 입력하셔야 합니다!');
    return;
  }

  // createItem으로 li 구성
  const li = createItem(text);
  
  // renderItem으로 li 배치
  renderItem(li, list);

  // input창 초기화
  input.value = '';
}

// li 설정
function createItem(text) {
  const li = document.createElement('li');
  const checkButton = createCheckButton (li);
  const removeButton = createRemoveButton(li);
  const textSpan = document.createElement('span');
  
  // li에 id 부여.
  const id = Date.now().toString();
  li.dataset.id = id;
  
  // 할 일 text span 설정
  textSpan.textContent = text;

  // li 배치 구성 (체크버튼 text 삭제버튼)
  li.append(checkButton, textSpan, removeButton);

  // 구성 완료된 li 반환
  return li;
}

// checkButton 설정
function createCheckButton(li) {
  const checkButton = document.createElement('button');
  
  checkButton.classList.add('checkButton');
  checkButton.type = 'button';
  checkButton.addEventListener('click', () => doneItem(li));

  return checkButton;
}

// removeButton 설정
function createRemoveButton(li) {
  const removeButton = document.createElement('button');

  removeButton.classList.add('removeButton');
  removeButton.type = 'button';
  removeButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
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
    </svg>
  `;
  removeButton.addEventListener('click', () => removeItem(li));

  return removeButton;
}

// 제작된 li 배치
function renderItem(li, list) {
  list.append(li);
} 

// li 제거
function removeItem(li) {
  li.remove();
  pourBeer();
}

// 완료한 할 일 체크
function doneItem(li) {
  li.classList.toggle('done');
  pourBeer();
}

// 할 일과 한 일 count 후 맥주 높이 계산
function doneCount() {
  const list = document.getElementById('listItem');
  const total = list.querySelectorAll('li').length;
  const done = list.querySelectorAll('li.done').length;

  // 맥주 최대 높이 : 84px
  const height = Math.ceil((done / total) * 84);
  
  return [total, done, height];
}

// doneCount() 결과에 따라 맥주 상태 조정
function pourBeer () {
  const [total, done, height] = doneCount();
  const beer = document.querySelector('.countBeer .beer');
  const foam1 = document.querySelector('.countBeer .foam1');
  const foam2 = document.querySelector('.countBeer .foam2');

  // 할 일이 없으면 맥주 높이 0, 거품 숨기기
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