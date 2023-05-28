const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "process.env.API_KEY",
  },
};

// listing movie data
window.onload = () => {
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
  // input data 받아오기
  e.preventDefault();
  const $value = document.getElementById("text").value;
  const $card = document.querySelectorAll(".card");

  // 버튼이 눌렸을때 기본적으로 hide class 지우고 진행.
  $card.forEach((i) => i.classList.remove("hide"));
  // input data가 있을때만 hide class 추가
  if ($value) {
    const sortList = [...$card].filter((i) => {
      return !i
        .querySelector(".movie-title")
        .textContent.toLowerCase()
        .includes($value);
    });
    sortList.forEach((i) => {
      i.classList.add("hide");
    });
  }
};
