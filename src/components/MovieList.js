import Component from '../core/Component'
import movieStore from '../store/movie'
import MovieItem from './MovieItem'
import { searchMovies } from '../store/movie'

export default class MovieList extends Component {
  constructor() {
    super()

    this.sortBy = 'latest'
    this.filterBy = 'all'

    movieStore.subscribe('movies', () => {
      // 구독
      this.render()
      // 영화 목록이 변경되면 render 메소드를 호출하여 변경된 영화 목록을 화면에 출력
    })
    movieStore.subscribe('loading', () => {
      this.render()
    })
    movieStore.subscribe('message', () => {
      this.render()
    })
  }

  render() {
    this.el.classList.add('movie-List')
    this.el.innerHTML = /*html*/ `
      ${
        movieStore.state.message
          ? `<div class="message">${movieStore.state.message}</div>`
          : '<div class="movies"></div>'
      }
      <div class="the-loader hide"></div>
    `

    const moviesEl = this.el.querySelector('.movies')
    moviesEl?.append(
      // 옵셔널 체이닝, 영화 목록이 없을 경우 append 메소드를 호출하지 않음
      ...movieStore.state.movies.map(movie => {
        // 전개 연산자
        // movieStore.state.movies에 있는 영화 목록을 순회하며
        return new MovieItem({ movie }).el // 영화 아이템을 배열로 반환
      })
    )

    const loaderEl = this.el.querySelector('.the-loader')
    movieStore.state.loading
      ? loaderEl.classList.remove('hide')
      : loaderEl.classList.add('hide')

    console.log('MovieList.render', movieStore)
  }
}
