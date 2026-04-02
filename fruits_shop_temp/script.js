// DOM 요소
const fruitList = document.getElementById("fruitList");
const veggieList = document.getElementById("veggieList");

const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let veggiePage = 0;

// 카드 렌더링 함수
function renderProducts(data, container) {
  //data는 과일 또는 야채의 배열
  console.log(data);
  container.innerHTML = "";
  data.forEach((item) => {
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card h-100 shadow-sm">
        <a href="detail.html?id=${item.id}" class="text-decoration-none text-dark">
          <img src="${item.img}" class="card-img-top" alt="${item.name}">
          <div class="card-body text-center">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text text-primary fw-bold">${item.price.toLocaleString()}원</p>
          </div>
          </a>
        </div>
      </div>`;
  });
}
////////아래 filterAndSortFruits() 와 loadVeggies() 완성하세요. /////////////////////////////////
/* 
  과일 출력
*/
function filterAndSortFruits() {
  let re;
  //과일 데이터를 검색어로 필터링
  if (searchBox.value === "") {
    re = fruits;
  } else {
    re = fruits.filter((fruits) => fruits.name.includes(searchBox.value));
    console.log(re);
  }

  // 선택에 따른 정렬
  if (sortSelect.value === "name") {
    //이름순
    re = re.toSorted((a, b) => a.name.localeCompare(b.name));
    console.log(re);
  } else if (sortSelect.value === "low") {
    //낮은 가격순
    re = re.toSorted((a, b) => a.price - b.price);
    console.log(re);
  } else if (sortSelect.value === "high") {
    //높은 가격순
    re = re.toSorted((a, b) => b.price - a.price);
    console.log(re);
  }

  //화면에 다시 출력
  //renderProducts(?, ?);
  return renderProducts(re, fruitList);
}

// 채소 출력 (3개씩 증가)
function loadVeggies() {
  const start = veggiePage * 3;
  //화면에 다시 출력
  //renderProducts(?, ?);
  renderProducts(veggies, veggieList);
}
////////////////////////////////////////////////////////

// 이벤트 리스너
searchBox.addEventListener("input", filterAndSortFruits);
sortSelect.addEventListener("change", filterAndSortFruits);
loadMoreBtn.addEventListener("click", loadVeggies);

// 초기 실행
filterAndSortFruits();
loadVeggies();
