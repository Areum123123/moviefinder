"use strict";

const searchBox = document.querySelector('#search-box'); // 검색창 input 요소
const searchButton = document.querySelector('.btn'); // 검색 버튼 요소
const cardsContainer = document.getElementById('cards'); // 영화 카드를 담는 요소
const post = document.querySelector('.postCard') // 포스트카드

document.addEventListener('DOMContentLoaded', () => {
    apifetch();
}); // 페이지 로드시 이벤트실행 


//focus() 검색 커서.
searchBox.focus();

//검색기능 

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchPost();
    }
});


window.searchPost = () => {
    // cardsContainer.empty(); //카드리스트 엠티
    let searchJs = searchBox.value.trim(); //input박스에적은 값 가지고와
    if (searchJs === '') {
        alert('검색어를 입력해주세요!');
        searchBox.focus();
        return;  //검색어가없으면
    }
    //검색어를 입력하면 실행
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWZmMjkzOTkyMmFiMTdmMmQzMTllZTY2NGYwZDdjYiIsInN1YiI6IjY2MjhjNjg2NGE0YmY2MDE2NTc3MDljNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YzDRvR6hari6z5TKLJ9CFrkyXeQmfVitNrk4i0duFPY'
        }
    };

    
    //검색포스터도 한국어 &language=ko 추가
    fetch(`https://api.themoviedb.org/3/search/movie?query=${searchJs}&language=ko&api_key=e1ff2939922ab17f2d319ee664f0d7cb`, options)
        .then(response => response.json())
        .then(response => {
            // console.log(response)
            if (response.results.length > 0) {
                displayMovies(response.results); // 검색어와 영화제목이 일치하는부분이 있다면 displayMovies호출 일치데이터와함께
            } else {
                alert('검색 결과가 없습니다.');
                return;
            }
        })
        .catch(error => console.error('에러 발생:', error));
}

// 전체 영화 정보 넘김

function apifetch() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMWZmMjkzOTkyMmFiMTdmMmQzMTllZTY2NGYwZDdjYiIsInN1YiI6IjY2MjhjNjg2NGE0YmY2MDE2NTc3MDljNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YzDRvR6hari6z5TKLJ9CFrkyXeQmfVitNrk4i0duFPY'
        }
    };
   
    // https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1 영어
    
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko', options)
        .then(response => response.json())
        .then(response => {
            displayMovies(response.results);
        })
        .catch(err => console.error(err));
}



//api데이터 카드에 붙이기 
function displayMovies(searchData) {
    cardsContainer.innerHTML = ''; // 기존 카드 제거

    // let result = response['results'];
    searchData.forEach(searchData => {
        let title = searchData.original_title;
        let overview = searchData.overview;
        let poster = searchData.poster_path;
        let vote = searchData.vote_average;
        let id = searchData.id



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
};



//문제 : 없는영화제목 검색후 엔터를 누르면  검색결과가없습니다 두번뜬다. 클릭은괜찮은데.. 엔터..에서 문제?문제
 //   const searchData = response.results;
  //   const movieData = searchData.find(searchD => searchD.original_title.toLowerCase().includes(searchJs.toLowerCase()));