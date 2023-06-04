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
    if (sortList.length === 0) {
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
