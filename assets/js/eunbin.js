
let idCounter = 1; 
let itemArray = [];
// let isDone = false;

// 오늘 찾기
const today = new Date();

// 일 지정
const day = today.getDate();

// 월 지정
const month = today.getMonth() + 1;

// 년 지정
const year = today.getFullYear();

// 요일 지정
const date = today.getDay();

const htmlDay = document.querySelector('.day');
htmlDay.textContent = day;

const htmlMon = document.querySelector('.mon');
htmlMon.textContent = month;

const htmlYear = document.querySelector('.year');
htmlYear.textContent = year;

function getTodayLabel() {
    let week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

    let todayLabel = week[date];

    return todayLabel;
}

const htmlDate = document.querySelector('.date');
htmlDate.textContent = getTodayLabel();


function init () {
    const arrString = localStorage.getItem('Eunbintodo');

    const todoArray = JSON.parse(arrString); 
    itemArray = [...todoArray];

    const maxIdNum = Math.max(...todoArray.map(item => {
        const num = parseInt(item.id.replace('todo-', ''));
        return isNaN(num) ? 0 : num;
    }), 0);

    idCounter = maxIdNum + 1;

    todoArray.forEach(item => {
        renderItem(item, item.id, item.date);
    })
}

init();


// 아이템 생성
function createItem ( value, id, date ) {

    if ( !value || value === "" || value === " " ) {
        const confirmResult = alert(`It's empty. Please write the task.`);
    } else {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.setAttribute('data-id', id);
        li.innerHTML = /* html */`
                <div>
                    <input type="checkbox" class="todo-checkbox" />
                    <span class="todo-text">${value}</span>
                </div>
                <div>
                    <span class="todo-date">${date}</span>
                    <button type="button" class="deleteBtn" onclick="handleRemove(this)">
                        <svg width="20" height="23" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.4 13.5L8 10.9L10.6 13.5L12 12.1L9.4 9.5L12 6.9L10.6 5.5L8 8.1L5.4 5.5L4 6.9L6.6 9.5L4 12.1L5.4 13.5ZM3 18C2.45 18 1.97933 17.8043 1.588 17.413C1.196 17.021 1 16.55 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.8043 17.021 14.413 17.413C14.021 17.8043 13.55 18 13 18H3ZM13 3H3V16H13V3Z" fill="black"/>
                        </svg>
                    </button>
                </div>
        `;

        return li;
    }

}

//생성된 아이템 렌더링
function renderItem( value, id, date ) {

    const item = createItem( value.value, id, date );
    if ( !item ) return;

    const todoList = document.querySelector('#todoList');
    todoList.appendChild(item);
}

//아이템 삭제
function removeItem ( id ) {
    //해당 data-id를 가진 <li> 요소를 찾아 DOM에서 제거
    let item = document.querySelector(`[data-id="${id}"]`);

    item.remove();
}

//아이템 배열로 추가
function addItemArray ( id, value, date ) {
    //새로운 할 일을 todoListArray에 객체 형태로 추가

    if ( value ) {
        const newObject = { id: id, value: value, date: date };

        itemArray.push(newObject);
        console.log('새 목록이 추가되었습니다.');

        const arrString = JSON.stringify(itemArray);
        localStorage.setItem('Eunbintodo', arrString );
    }

    console.log(itemArray);

}

//아이템 배열에서 삭제
function removeItemArray ( id ) {
    //배열에서 해당 id와 일치하는 항목을 제거 (filter 사용)
    //지금 받은 값은 'todo-1'
    console.log('삭제할 id:', id);
    itemArray = itemArray.filter((item) => { return item.id !== id });

    console.log(itemArray);
    console.log('목록이 삭제되었습니다.');

    localStorage.setItem('Eunbintodo', JSON.stringify(itemArray));

}

function handleTodoList ( e ) {
    
    const savedDay = today;
    const dateString = savedDay.toLocaleDateString();

    let input = document.querySelector('#inputValue');
    const id = `todo-${idCounter++}`;

    renderItem( input, id, dateString );
    addItemArray( id, input.value, dateString );

    input.value = '';

}

function handleRemove ( e ) {

    const removeLi = e.closest('li');
    const removeLiId = removeLi.dataset.id;

    removeItem( removeLiId );
    removeItemArray( removeLiId );
}



