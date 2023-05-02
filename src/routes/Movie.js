import Component from '../core/Component'
import movieStore, { getMovieDetails } from '../store/movie'

export default class Movie extends Component {
  constructor() {
    super({
      state: {
        FM: []
      }
    })
  }

  async render() {
    this.el.classList.add('container', 'the-movie')
    this.el.innerHTML = /*html*/ `
      <div class="inner">
        <div class="posterbox">
          <div class="poster skeleton">
            <div class="type">
            </div>
          </div>
          <div class="boxoffice skeleton">
          </div>
          <div class="grade skeleton">
          </div>
        </div>
        <div class="details">
          <div class="title skeleton">
          </div>
          <div class="plot skeleton">
          </div>
          <div class="sub-content">
            <div class="info skeleton">
            </div>
          </div>
        </div>
        <button class="btn btn-back skeleton"></button>
      </div>
    `

    await getMovieDetails(history.state.id)
    const { movie } = movieStore.state
    const bigPoster = movie.Poster.replace('SX300', 'SX700') // 포스터 이미지를 더 크게 보여주기 위해 SX300을 SX700으로 변경

    let averageRate
    if (movie.Ratings.length === 3) {
      if (
        movie.Ratings[1].Source === 'Rotten Tomatoes' &&
        movie.Ratings[2].Source === 'Metacritic'
      ) {
        averageRate = (
          (Number(movie.imdbRating) +
            Number(movie.Ratings[1].Value.split('%')[0]) / 10 +
            Number(movie.Ratings[2].Value.split('/')[0]) / 10) /
          3
        ).toFixed(1)
      } else if (
        movie.Ratings[1].Source === 'Metacritic' &&
        movie.Ratings[2].Source === 'Rotten Tomatoes'
      ) {
        averageRate = (
          (Number(movie.imdbRating) +
            Number(movie.Ratings[1].Value.split('/')[0]) / 10 +
            Number(movie.Ratings[2].Value.split('%')[0]) / 10) /
          3
        ).toFixed(1)
      }
    } else if (movie.Ratings.length === 2) {
      if (
        movie.Ratings[0].Source === 'Internet Movie Database' &&
        movie.Ratings[1].Source === 'Rotten Tomatoes'
      ) {
        averageRate = (
          (Number(movie.imdbRating) +
            Number(movie.Ratings[1].Value.split('%')[0]) / 10) /
          2
        ).toFixed(1)
      } else if (
        movie.Ratings[0].Source === 'Internet Movie Database' &&
        movie.Ratings[1].Source === 'Metacritic'
      ) {
        averageRate = (
          (Number(movie.imdbRating) +
            Number(movie.Ratings[1].Value.split('/')[0]) / 10) /
          2
        ).toFixed(1)
      }
    } else if (movie.Ratings.length === 1) {
      if (movie.Ratings[0].Source === 'Metacritic') {
        averageRate = Number(movie.Ratings[0].Value.split('/')[0]) / 10
      } else if (movie.Ratings[0].Source === 'Rotten Tomatoes') {
        averageRate = Number(movie.Ratings[0].Value.split('%')[0]) / 10
      } else if (movie.Ratings[0].Source === 'Internet Movie Database') {
        averageRate = Number(movie.Ratings[0].Value.split('/')[0])
      }
    } else {
      averageRate = 'N/A'
    }

    this.el.innerHTML = /*html*/ `
      <div class="inner">
        <div class="posterinner">
          <div class="posterbox">
            <div style="background-image: url(${bigPoster})" class="poster">
              <div class="type">
                  <p>${movie.Type}</p>
              </div>
            </div>
            <div class="boxoffice">
                <h3>BoxOffice : <span>${movie.BoxOffice}</span></h3>
              </div>
              <div class="grade">
                <h3>Average Ratings : ${averageRate}</h3>
              </div>
          </div>
          <div class="details">
            <div class="title">
              <h2>${movie.Title}<h2>
            </div>
            <div class="plot">
              <h2><span>SUMMARY<span></h2>
              ${movie.Plot}
            </div>
            <div class="sub-content">
              <h3>Release Date : <span>${movie.Released}</span></h3>
              <h3>Runtime : <span>${movie.Runtime}</span> </h3>
              <h3>Country : <span>${movie.Country}</span></h3>
              <div class="info">
                <h3>Awards : <span>${movie.Awards}</span></h3>
                <h3>Age Rating : <span>${movie.Rated}</span></h3>
                <h3>Genre : <span>${movie.Genre}</span></h3>
                <h3>Director : <span>${movie.Director}</span></h3>
                <h3>Writer : <span>${movie.Writer}</span></h3>
                <h3>Actors : <span>${movie.Actors}</span></h3>
              </div>
            </div>
          </div>
        </div>
        <div class="btns">
          <button class="btn btn-back" onClick="window.history.back()"><span class="material-symbols-outlined">
  keyboard_backspace
  </span></button>
          <button class="btn btn-favorit"><span id="addmovie" class="material-symbols-outlined">
  favorite
  </span></button>
        </div>

      </div>
      `
    const btnFavorit = this.el.querySelector('.btn-favorit')
    const addMovie = this.el.querySelector('#addmovie')
    let isFavorit = false

    btnFavorit.addEventListener('click', () => {
      const { movie } = movieStore.state
      let storedMovies = JSON.parse(localStorage.getItem('favoritMovies')) || []

      if (!isFavorit) {
        // 영화를 추가하는 경우
        storedMovies.push(movie)
        localStorage.setItem('favoritMovies', JSON.stringify(storedMovies))
        addMovie.textContent = 'heart_check'
        isFavorit = true
      } else {
        // 영화를 삭제하는 경우
        const updatedStoredMovies = storedMovies.filter(
          storedMovie => storedMovie.title !== movie.title
        )
        localStorage.setItem(
          'favoritMovies',
          JSON.stringify(updatedStoredMovies)
        )
        addMovie.textContent = 'favorite'
        isFavorit = false
      }
    })

    // ratings 요소가 존재하는 경우에만 평가 점수 HTML 추가
    const ratings = this.el.querySelector('.grade') // ratings 요소 선택
    if (ratings) {
      // ratings 요소가 존재하는 경우에만 평가 점수 HTML 추가
      movie.Ratings.forEach(rating => {
        if (rating?.Value) {
          if (rating.Source === 'Rotten Tomatoes') {
            ratings.innerHTML += `<p>- Rotten Tomatoes : ${
              Number(rating.Value.split('%')[0]) / 10
            } / 10</p>`
          } else if (rating.Source === 'Metacritic') {
            ratings.innerHTML += `<p>- Metacritic: ${
              Number(rating.Value.split('/')[0]) / 10
            } / 10</p>`
          } else {
            ratings.innerHTML += `<p>- IMDB: ${Number(
              rating.Value.split('/')[0]
            )} / 10</p>`
          }
        }
      })
    }
    console.log(movie.averageRate)
    const boxOfficeEl = this.el.querySelector('.boxoffice')
    if (
      movie.BoxOffice === undefined ||
      movie.BoxOffice === null ||
      movie.BoxOffice === 'N/A'
    ) {
      boxOfficeEl.style.display = 'none'
    }
    const gradeEl = this.el.querySelector('.grade')
    if (averageRate === 'N/A') {
      gradeEl.style.display = 'none'
    }
    const noPoster = this.el.querySelector('.poster')
    if (noPoster.style.backgroundImage === 'url("N/A")') {
      noPoster.style.backgroundImage =
        'url("https://static-00.iconduck.com/assets.00/flying-saucer-emoji-2048x1837-wqaxl6sz.png")'
    } else {
      noPoster.style.backgroundImage = `url(${bigPoster})`
    }
  }
}
