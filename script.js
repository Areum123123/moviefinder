document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.querySelector('#search-box'); // 검색창 input 요소
  const searchButton = document.querySelector('.btn'); // 검색 버튼 요소
  const cardsContainer = document.getElementById('cards'); // 영화 카드를 담는 요소


  

// 각 카드를 클릭할 때 실행될 함수
function cardClicked() {
    alert("카드가 클릭되었습니다!");
    //여기에 api id값 alert로??? 되나?
  }

  // 모든 postCard 요소를 선택하고 클릭 이벤트를 추가
  document.querySelectorAll('.postCard').forEach(item => {
    item.addEventListener('click', cardClicked);
  });





  // 검색 버튼에 클릭 이벤트 리스너 추가
  searchButton.addEventListener('click', function() {
      searchMovies();
  });

  // 검색창에서 엔터 키를 눌렀을 때 검색 실행
  searchBox.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          searchMovies();
      }
  });

  // 모든 카드를 표시하는 함수
  function showAllCards() {
      const options = {
          method: 'GET',
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWZmMjkzOTkyMmFiMTdmMmQzMTllZTY2NGYwZDdjYiIsInN1YiI6IjY2MjhjNjg2NGE0YmY2MDE2NTc3MDljNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YzDRvR6hari6z5TKLJ9CFrkyXeQmfVitNrk4i0duFPY'
          }
      };

      fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
          .then(response => response.json())
          .then(response => {
              const result = response.results;
              displayMovies(result);
          })
          .catch(err => console.error(err));
  }

  // 영화 검색을 수행하는 함수
  function searchMovies() {
      const searchTerm = searchBox.value.trim(); // 입력된 검색어 (공백 제거)
      if (searchTerm === '') {
          // 검색어가 없으면 모든 카드를 표시
          showAllCards();
          return;
      }

      const options = {
          method: 'GET',
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWZmMjkzOTkyMmFiMTdmMmQzMTllZTY2NGYwZDdjYiIsInN1YiI6IjY2MjhjNjg2NGE0YmY2MDE2NTc3MDljNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YzDRvR6hari6z5TKLJ9CFrkyXeQmfVitNrk4i0duFPY'
          }
      };
  //검색관련
      fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}`, options)
          .then(response => response.json())
          .then(response => {
              if (response.results && response.results.length > 0) {
                  const movies = response.results;
                  displayMovies(movies);
              } else {
                  
                  console.log('검색 결과가 없습니다.');
                  cardsContainer.innerHTML = ''; // 이전에 표시된 카드 모두 제거
              }
          })
          .catch(error => console.error('에러 발생:', error));
  }
 
  // 영화 카드를 화면에 표시하는 함수
  function displayMovies(movies) {
      cardsContainer.innerHTML = ''; // 이전 카드 모두 제거
      movies.forEach(movie => {
          let title = movie.original_title;
          let overview = movie.overview;
          let poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'; // 포스터 이미지가 없는 경우 기본 이미지 사용
          let vote = movie.vote_average;
              

           // overview가 일정 길이를 넘어갈 경우 더 보기 버튼 추가
        if (overview.length > 180) {
          overview = overview.slice(0, 180) + '...';
          overview += `<button type="button" class="btn btn-link" id='plusbtn'>더보기</button>`;
          
          // <button class="expand-button btn btn-sm btn-primary">더 보기</button>
      }
         
    
  

          const cardHTML = `
              <div class="col-md-6">
                  <div class="postCard">
                      <div class="card mb-3" style="max-width: 540px;">
                          <div class="row g-0">
                              <div class="col-md-4">
                                  <img src="${poster}" class="img-fluid rounded-start" alt="${title}">
                              </div>
                              <div class="col-md-8">
                                  <div class="card-body">
                                      <h5 class="card-title">${title}</h5>
                                      <p class="card-text">${overview}</p>
                                      <p class="card-text"><small class="text-body-secondary">평점: ${vote}</small></p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>`;
          
          cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
      });
  }

  const expandButtons = document.querySelectorAll('#plusbtn');
expandButtons.forEach(button => {
    button.addEventListener('click', function() {
        const cardText = this.previousElementSibling;
        if (cardText.classList.contains('expanded')) {
            cardText.classList.remove('expanded');
            this.textContent = '더 보기';
        } else {
            cardText.classList.add('expanded');
            this.textContent = '간략히 보기';
          }
      });
  });
  showAllCards();
});


