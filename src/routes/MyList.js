import Component from '../core/Component'
import MovieList from '../components/MovieList'

export default class MyList extends Component {
  constructor() {
    super({
      tagName: 'div',
      state: {
        movies: []
      }
    })
  }

  async fetchMovies(query) {
    // ...
  }

  render() {
    this.el.innerHTML = /*html*/ `
      <h2>My Movie</h2>
      <div class="movie-list"></div>
    `
    const movieList = new MovieList({
      movies: this.state.movies
    })
    movieList.render()
    this.el.querySelector('.movie-list').appendChild(movieList.el)
  }
}
