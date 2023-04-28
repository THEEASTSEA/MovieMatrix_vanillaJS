import Component from '../core/Component.js'
import Headline from '../components/Headline.js'
import Search from '../components/Search.js'
import MovieList from '../components/MovieList.js'
import MovieListMore from '../components/MovieListMore.js'

export default class Home extends Component {
  render() {
    const headline = new Headline().el
    const search = new Search().el
    const movieList = new MovieList().el
    const movieListMore = new MovieListMore().el
    this.el.classList.add('container')

    this.el.append(headline, search, movieList, movieListMore)
  }
}
