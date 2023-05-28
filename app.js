const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjY5MDEwOTNkNDQzM2EyNGFiZTRkMjdiMmM0YTRkMyIsInN1YiI6IjY0NzE5OTI1OTQwOGVjMDExZjJiNDZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EUGvXNsr4R7VmKWXg8f_-xDsn9NyQOmaoBv-NryWFsc",
  },
};

const listing = () => {
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

        let temp_html = ` <img class="poster" src="${url}" alt="movie">
                        <h3 style=" text-align: center; text-decoration: underline;">${title}</h3>
                        <p>${desc}
                        </p>
                        <footer class="rate"><p>Ration : ${rate}</p></footer>
                      `;
        // cardList 하위로 card 요소들 붙여넣기
        const $cardList = document.getElementById("card-list");
        const $card = document.createElement("div");
        $card.classList.add("card");
        $card.innerHTML = temp_html;
        $cardList.appendChild($card);

        // click 이벤트 적용
        $card.addEventListener("click", () => {
          alert(`영화 id : ${id}`);
        });
      });
    })
    .then((response) => {
      // 검색기능 구현
      const $form = document.querySelector(".search-form");
      $form.addEventListener("submit", onclickSearch);
    })
    .catch((err) => console.error(err));
};
listing();

const onclickSearch = (e) => {
  e.preventDefault();
  const $value = document.getElementById("text").value;

  // cardList 하위 요소 삭제 구문
  const $cardList = document.getElementById("card-list");
  const $card = document.querySelectorAll(".card");
  $card.forEach((card) => {
    $cardList.removeChild(card);
  });

  // 빈 검색창 입력 시
  if (!$value) listing();
  else {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        let sortList = response["results"].filter((i) => {
          return i["title"].toLowerCase().includes($value);
        });

        sortList.forEach((i) => {
          let title = i["title"];
          let rate = i["vote_average"];
          let desc = i["overview"];
          let img = i["poster_path"];
          let id = i["id"];
          let url = `https://image.tmdb.org/t/p/w500/${img}`;

          let temp_html = ` <img class="poster" src="${url}" alt="movie">
                        <h3 style=" text-align: center; text-decoration: underline;">${title}</h3>
                        <p>${desc}
                        </p>
                        <footer class="rate"><p>Ration : ${rate}</p></footer>
                      `;
          // cardList 하위로 card 요소들 붙여넣기
          const $cardList = document.getElementById("card-list");
          const $card = document.createElement("div");
          $card.classList.add("card");
          $card.innerHTML = temp_html;
          $cardList.appendChild($card);

          // click 이벤트 적용
          $card.addEventListener("click", () => {
            alert(`영화 id : ${id}`);
          });
        });
      });
  }
};
