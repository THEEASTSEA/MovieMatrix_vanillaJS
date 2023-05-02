import Component from '../core/Component'
import movieStore from '../store/movie'
import MovieItem from './MovieItem'
import { searchMovies } from '../store/movie'

export default class MovieList extends Component {
  constructor() {
    super()
  }
  render() {
    this.el.classList.add('movie-List')
    this.el.innerHTML = /*html*/ `
      <div class="movies">ㄹㅇㄴㄹㅇㄴㄹㅇㄴ</div>'
    `
  }
}
