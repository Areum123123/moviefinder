

document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.querySelector('#search-box'); // 검색창 input 요소
    const searchButton = document.querySelector('.btn'); // 검색 버튼 요소
    const cardsContainer = document.getElementById('cards'); // 영화 카드를 담는 요소
    // const post = document.querySelector('.postCard') // 포스트카드
    
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
        const search = searchBox.value.trim(); // 입력된 검색어 (공백 제거)
        if (search === '') {
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
        fetch(`https://api.themoviedb.org/3/search/movie?query=${search}`, options)
            .then(response => response.json())
            .then(response => {
                if (response.results && response.results.length > 0) {
                    const movies = response.results;
                    displayMovies(movies);
                } else {
                    // 검색 결과가 없을 경우 메시지 표시
                   
                  //   cardsContainer.innerHTML = ''; // 검색결과 없으면 빈공간.
                    alert('검색 결과가 없습니다.'); // 
                    
                }
            })
            .catch(error => console.error('에러 발생:', error));
    }

    // 영화 카드를 화면에 표시하는 함수 // 위에서 받아온 const movies = response.results;
    function displayMovies(movies) {
        cardsContainer.innerHTML = ''; // 이전 카드 모두 제거
        movies.forEach(movie => {
            let title = movie.original_title; //results[orginal_title]
            let overview = movie.overview;
            let poster = movie.poster_path;
            let vote = movie.vote_average;
            let id = movie.id;

          console.log(movie) //확인용
          
            const temp_html = ` <div class="movieCard" onclick="alert('영화 ID: ${id}')" >
               <div class="card h-100">
                 <img src="https://image.tmdb.org/t/p/w500${poster}" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title">${title}</h5>
                   <p class="card-text">${overview}</p>
                 </div>
                 <div class="card-footer">
                   <small class="text-body-secondary">평점: ${vote}</small>
                 </div>
               </div>
             </div>`
            
            cardsContainer.insertAdjacentHTML('beforeend', temp_html);
        });
        
    }

    showAllCards();
  });
  
  
  
  
  
  
  
  
