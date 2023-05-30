const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "process.env.API_KEY",
  },
};

// 페이지 로드 시 listing movie data
window.onload = () => {
  //input focusing
  document.getElementById("input-text").focus();
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      response["results"].forEach((i) => {
        let title = i["title"];
        let rate = i["vote_average"];
        let desc = i["overview"];
        let img = i["poster_path"];
        let id = i["id"];
        let url = `https://image.tmdb.org/t/p/w500/${img}`;

        let temp_html = `<img class="poster" src="${url}" alt="movie">
                        <h3 class="movie-title">${title}</h3>
                        <p>${desc}
                        </p>
                        <footer class="rate"><p>Ration : ${rate}</p></footer>
                      `;

        // cardList 하위로 card 요소들 붙여넣기
        const $cardList = document.getElementById("card-list");
        const $card = document.createElement("div");
        $card.classList.add("card");
        $card.innerHTML = temp_html;
        $cardList.append($card);

        // card가 생성 될 때부터 click 이벤트 적용
        $card.addEventListener("click", () => {
          alert(`영화 id : ${id}`);
        });
      });
    })
    .catch((err) => console.error(err));
};

// 검색기능 함수
const onclickSearch = (e) => {
  e.preventDefault();
  // input data 받아오기
  const $inputText = document.getElementById("input-text");
  const $value = $inputText.value;
  const $card = document.querySelectorAll(".card");

  // 두글자 이상 입력 조건
  if ($value.length === 1) {
    alert("두글자 이상 입력하세요.");
  } else if ($value) {
    // card title 기준 필터링
    const sortList = [...$card].filter((i) => {
      return !i // title이 포함되지 않는 node만 필터링
        .querySelector(".movie-title")
        .textContent.toLowerCase()
        .includes($value);
    });
    // 검색어와 일치하는 영화가 없을 때
    if (sortList.length === 20) {
      alert("검색어와 일치하는 영화가 없습니다.");
    } else {
      $card.forEach((i) => i.classList.remove("hide"));
      sortList.forEach((i) => {
        // 필터링된 node만 숨기기
        i.classList.add("hide");
      });
    }
  } else {
    // 아무것도 입력 받지 않았을 때
    $card.forEach((i) => i.classList.remove("hide"));
  }
  // 검색 클릭 후 input focusing
  $inputText.focus();
};
