const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MjY5MDEwOTNkNDQzM2EyNGFiZTRkMjdiMmM0YTRkMyIsInN1YiI6IjY0NzE5OTI1OTQwOGVjMDExZjJiNDZkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EUGvXNsr4R7VmKWXg8f_-xDsn9NyQOmaoBv-NryWFsc",
  },
};

document.getElementById("input-text").focus();
fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const $cardList = document.getElementById("card-list");
    $cardList.innerHTML = response["results"]
      .map((movie) => {
        const { title, vote_average, overview, poster_path, id } = movie;

        return `<li id="${id}"class="card">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="movie">
                    <div class="movie-info">
                      <h3 class="movie-title">${title}</h3>
                      <span class="rate">${vote_average}</span>
                    </div>
                    <div class="overview">${overview}</div>
          </li>`;
      })
      .join("");
  })
  .catch((err) => console.error(err));
