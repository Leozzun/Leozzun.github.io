//초기 데이터
let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date().getTime() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date().getTime() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date().getTime() },
];

// 요일 출력을 위한 배열
let day = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
  initData(mockData);
  document.querySelector("h1").innerHTML =
    new Date().getFullYear() +
    "년 " +
    (new Date().getMonth() + 1) +
    "월 " +
    new Date().getDate() +
    "일 " +
    day[new Date().getDay()] +
    "요일";
};

const initData = (printData) => {
  // mockData 배열을 forEach를 이용해서 화면에 출력한다.
  let str = "";
  printData.forEach((todo) => {
    // 각 todo 아이템을 화면에 추가하는 로직
    str += `<div class="TodoItem">
      <input type="checkbox"
        onchange="onUpdate(${todo.id})"
        ${todo.isDone ? "checked" : ""}>
      
      <div class="content">${todo.content}</div>

      <div class="date">${new Date(todo.date).toLocaleString()}</div>

      <button 
        name="delete"
        value="${todo.id}"
        onclick="todoDel(this)">
        삭제
      </button>
    </div>
  `;
  });
  document.querySelector(".todos_wrapper").innerHTML = str;
};

// 추가 기능
let idIndex = 3; // id의 값을 증가 시킬 변수(초기데이터가 2까지 있으므로 3부터 시작)
document.querySelector(".Editor > button").onclick = (event) => {
  event.preventDefault(); //전송기능 막음
  //id는 idIndex,
  // isDone은 기본 false,
  // content는 입력한 내용,
  // date는 new Date().getTime()
  // 준비된 하나의 레코드를 mokData에 push()함수를 이용해서 추가한다.
  let content = document.querySelector(".Editor > input").value;

  mockData.push({
    id: idIndex++,
    isDone: false,
    content: content,
    date: new Date().getTime(),
  });
  initData(mockData); //호출한다.(다시 화면 랜더링)

  document.querySelector(".Editor > input").value = "";
};

// 수정 기능
const onUpdate = (targetId) => {
  //TodoItem에서 호출할 때 전달한 id
  /* mockData의 state의 값들 중에 targetId와 일치하는 todoitem의 isDone 변경
    map함수를 이용한다. map함수의 결과를 mockData에 저장한다.
    */
  mockData = mockData.map((todo) => {
    if (todo.id == targetId) {
      todo.isDone = !todo.isDone;
    }
    return todo;
  });
  initData(mockData); //호출한다.(다시 화면 랜더링)
};

// 삭제 기능
const todoDel = (th) => {
  //filter()함수를 이용해서 삭제하려는 대상이외의 todo만 추출해서 mockData에 담든다.
  mockData = mockData.filter((todo) => todo.id != th.value);

  initData(mockData); //호출한다.(다시 화면 랜더링)
};

// 검색 기능
document.querySelector("#keyword").onkeyup = (e) => {
  let searchedTodos = getFilterData(e.target.value);
  initData(searchedTodos);
};

const getFilterData = (search) => {
  //검색어가 없으면 mockData를 리턴한다.
  if (search === "") {
    return mockData;
  } else {
    //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다
    //filter의 결과를 리턴 한다.
    let re = mockData.filter((todo) => todo.content.includes(search));
    console.log(re);
    return re;
  }
};
