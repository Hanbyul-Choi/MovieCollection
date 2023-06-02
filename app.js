const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjY5MDEwOTNkNDQzM2EyNGFiZTRkMjdiMmM0YTRkMyIsInN1YiI6IjY0NzE5OTI1OTQwOGVjMDExZjJiNDZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EUGvXNsr4R7VmKWXg8f_-xDsn9NyQOmaoBv-NryWFsc",
  },
};

// 페이지 로드 시 listing movie data
window.onload = () => {
  //input 태그 focusing
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
                        <div class="movie-info">
                          <h3 class="movie-title">${title}</h3>
                          <span class="rate">${rate}</span>
                        </div>
                        <div class="overview">${desc}</div>
                      `;

        // $cardList 하위로 넣을 card 만들기
        const $card = document.createElement("div");
        $card.classList.add("card");
        $card.innerHTML = temp_html;

        // cardList 하위로 card HTML 요소들 붙여넣기
        const $cardList = document.getElementById("card-list");
        $cardList.appendChild($card);

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
    // card title 포함되는지 필터링
    const sortList = [...$card].filter((i) => {
      return i
        .querySelector(".movie-title")
        .textContent.toLowerCase()
        .includes($value);
    });
    // 검색어와 일치하는 영화가 없을 때 알림
    if (!sortList.length) {
      alert("검색어와 일치하는 영화가 없습니다.");
    } else {
      // 필터링된 node만 보이기
      $card.forEach((i) => i.classList.add("hide"));
      sortList.forEach((i) => i.classList.remove("hide"));
    }
  } else {
    // 아무것도 입력 받지 않았을 때 다시 전부 보여주기
    $card.forEach((i) => i.classList.remove("hide"));
  }
  // 검색 클릭 후 input focusing
  $inputText.focus();
};
