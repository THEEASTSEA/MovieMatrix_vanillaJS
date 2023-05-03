import Component from '../core/Component'
import movieStore from '../store/movie'
import MovieItem from '../components/MovieItem'
import { searchMovies } from '../store/movie'

export default class MovieList extends Component {
  constructor() {
    super({
      tagName: 'inner'
    })
  }
  render() {
    // 로컬 스토리지에서 favoritMovies 키 데이터 가져오기
    const favoriteMovies = JSON.parse(localStorage.getItem('favoritMovies'))

    // favoriteMovies 객체의 속성(프로퍼티) 중 'Title'과 'Poster' 출력하기
    favoriteMovies.forEach(movie => {
      const posterSrc = movie.Poster
        ? movie.Poster
        : 'https://static-00.iconduck.com/assets.00/flying-saucer-emoji-2048x1837-wqaxl6sz.png'
      const movieElement = document.createElement('section')
      movieElement.innerHTML = /*html*/ `
          <div class="poster">
            <a href="https://stalwart-nougat-119b80.netlify.app/#/movie?id=${movie.imdbID}">
            <img src="${posterSrc}" alt="${movie.Title}">
            </a>
          </div>
          <button class="delete" data-title="${movie.Title}">delete</button>
      `

      movieElement.querySelector('.delete').addEventListener('click', event => {
        const title = event.target.dataset.title
        const index = favoriteMovies.findIndex(movie => movie.Title === title)
        if (index > -1) {
          favoriteMovies.splice(index, 1)
          localStorage.setItem('favoritMovies', JSON.stringify(favoriteMovies))
          event.target.closest('.movie').remove()
        }
      })
      movieElement.classList.add('movie')
      this.el.appendChild(movieElement)
    })
  }
}
