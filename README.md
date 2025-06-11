![header](https://capsule-render.vercel.app/api?type=waving&color=D2BCFF&height=200&section=header&text=TodoList&fontSize=60)

# 👑 프로그래머스 데브코스 프론트엔드 5기 - 5팀 [다섯 공주들]

## 📌 프로젝트 소개

**투두리스트 앱**을 바닐라 JavaScript로 구현하며, JS의 기초 문법, DOM 조작, 이벤트 처리, LocalStorage 등을 실습했습니다.

## 🎯 프로젝트 목적

본 프로젝트는 팀원 간 실력 편차를 고려하여, 개별적인 개발 경험을 극대화하는 것을 주요 목표로 합니다. 일반적인 팀 프로젝트에서는 하나의 코드베이스를 공동으로 작성하게 되며, 이 과정에서 상대적으로 경험이 부족한 팀원은 구현 과정에 적극적으로 참여하기보다는 기존 코드를 수동적으로 따라가는 데 그치는 경우가 많습니다.

이러한 학습상의 비효율을 해소하고자, 본 팀은 팀원 각자가 독립적으로 투두리스트 애플리케이션을 구현하는 방식을 채택하였습니다. 이후 각각의 결과물을 하나의 통합 페이지에 iframe을 활용하여 병렬적으로 구성함으로써, 협업의 형태를 유지하면서도 자율적인 개발 역량 향상을 도모하고자 하였습니다.

이와 같은 구조는 다음과 같은 학습 효과를 기대합니다:

- **팀원 전원이 기획, 설계, 개발, 테스트의 전 과정을 주도적으로 수행**

- **HTML, CSS, JavaScript의 기초 활용 능력을 개인별로 점검**

- **서로 다른 구현 방식을 시각적으로 비교하며 다양한 UI/UX 접근 방식 학습**

- **프로젝트 완성 이후에도 코드 유지보수 및 확장성에 대한 개별적인 고민 유도**

결과적으로 본 프로젝트는 협업과 개별 학습이라는 두 가지 목적을 균형 있게 달성하고자 기획되었습니다.

---

## 👩‍👩‍👧‍👧 참여 팀원

- **효영공주(?)**
- **수진공주**
- **유하공주**
- **은정공주**
- **은빈공주**

---

## 🛠 사용 기술 스택

- ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
- ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
- **LocalStorage** – 브라우저 내 데이터 저장 및 상태 유지

---

## ✅ 메인 페이지 기능 및 UI

### 🔹 메인

- 기능 : 개인 페이지로 라우팅
- 기술 포인트 : iframe 기반 메인 페이지 기능 설명

1. 페이지 통합 및 분리 관리
   설명: 메인 페이지에서는 여러 개의 하위 페이지를 하나의 화면에 통합하여 보여줍니다.
   방법: 각 하위 페이지는 iframe 태그를 통해 독립적으로 로드되며, 메인 페이지의 레이아웃에 맞게 배치됩니다.
2. 독립적인 페이지 동작
   설명: 각 iframe은 별도의 웹 페이지처럼 동작합니다. 즉, 하나의 iframe에서 발생하는 이벤트나 페이지 전환이 다른 iframe에 영향을 주지 않습니다.
   이점 : 서로 다른 코드베이스 간의 충돌을 방지하고, 각 페이지의 기능을 독립적으로 테스트하거나 다양한 정보를 동시에 확인할 수 있도록 iframe 방식을 채택하였습니다.

- 스크린샷 :

  <img src="./assets/images/main/readme_main.png" alt="main UI" width="900" />
  <img src="./assets/images/main/readme_iframe.png" alt="iframe UI" width="900" />
  <img src="./assets/images/main/readme_nav.png" alt="nav UI" width="600" />

## ✅ 팀원별 기능 및 UI

### 🔹 효영

- **기능**: `할 일 리스트 출력`, `토글 전환`, `모달`, `할 일 리스트 정렬`, `로컬 스토리지 저장 및 로드`.
- **기술 포인트**:

1. `상태 기반 렌더링`: daily와 task 두 가지 모드를 상태로 관리하고, 토글 버튼을 통해 전환하여 일관된 UI를 유지.

2. `사용자 입력 처리`: 마감일 입력 시 prompt 대신 모달 창을 활용하여 사용자 경험을 향상.

3. `날짜 유효성 검증`: 잘못된 날짜 입력을 사전에 감지할 수 있도록 Date 객체 기반의 유효성 검사 로직을 구현.

4. `D-Day 계산`: 마감일까지 남은 날짜를 직관적으로 확인할 수 있도록 Date 객체를 활용한 D-Day 계산 기능을 적용.

5. `로컬 스토리지 동기화`: 작성한 할 일 데이터는 localStorage에 자동 저장되어 새로고침 후에도 상태가 유지.

6. `디데이 기반 정렬`: Task 목록은 마감일이 가까운 순서로 정렬되어 사용자에게 우선순위가 높은 항목을 먼저
   노출.

7. `할 일 만료 자동 처리`: D-Day가 지난 할 일은 자동으로 제거되어, 유효하지 않은 작업이 리스트에 남지 않도록 관리.

- **스크린샷**:

<img src="./assets/images/sub/hyo/daily_screenshot.png" alt="효영 UI" width="900" />
<img src="./assets/images/sub/hyo/task_screenshot.png" alt="효영 UI" width="900" />
<img src="./assets/images/sub/hyo/modal_screenshot.png" alt="효영 UI" width="900" />

---

### 🔹 수진

- **기능**: 삭제 애니메이션, 할 일 완료 체크, 리스트 필터링
- **기술 포인트**: `classList`와 `transitionend` 이벤트 활용
- **스크린샷**:

<img src="./images/sujin.png" alt="수진 UI" width="300" />

---

### 🔹 유하

- **한 줄 소개**: 할 일을 완료할수록 맥주잔이 차오르는 직관적이고 재밌는 todoList
- **기능**: 할 일 추가, 삭제 및 저장
- **기술 포인트**: LocalStorage 연동
- **스크린샷**:

**🖼️ 메인 페이지 UI**

<img src="../main/assets/images/sub/yoo/uha.mainPage.png" alt="유하 메인 페이지 UI" width="300" />

> 메인 블럭 상단에 왠지 채우고 싶은 맥주잔들이 늘어서 있습니다.  
> 할 일을 추가하는 입력창과 입력버튼, 할 일이 추가되는 구간도 맥주와 맥주거품이 생각나도록 색상 설정했습니다.

**🖼️ 완료 시 화면**

<img src="../main/assets/images/sub/yoo/uha.allDone.png" alt="유하 완료 페이지" width="300" />

> 할 일을 작성하고 모두 완료하면 가장 오른쪽에 있는 맥주잔에 맥주가 차오릅니다.  
> 할 일의 갯수와 완료한 일의 갯수에 따라 달라지는 맥주 양을 확인해보세요.  
> 맥주와 할 일은 새로고침 후에도 유지됩니다. 🍺

---

### 🔹 은정

- **기능**: ➕할 일 추가, ➖할 일 삭제, 💽localStorage
- **기술 포인트**: localStorage 연동
- **스크린샷**:

<img src="../main/assets/images/sub/eun/eunjung_screen.png" alt="은정 UI" width="300" />

---

### 🔹 은빈

- **기능**: ✅ 할 일 추가 ❌ 할 일 삭제 🕒 저장한 날짜 함께 표시 🔄 새로고침해도 할 일 유지 (localStorage 사용)
- **기술 포인트**: localStorage 연동으로 새로고침해도 목록 연동
- **스크린샷**:

<img src="../main/assets/images/sub/bin/eunbinSs.png" alt="은빈 UI" width="300" />

---

## 🚀 실행 방법

```bash
git clone https://github.com/programmers-todoList/main
cd main
# index.html 파일을 브라우저로 열면 실행됩니다.
```
