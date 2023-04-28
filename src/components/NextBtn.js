import Component from '../core/Component'
import movieStore from '../store/movie'

export default class NextBtn extends Component {
  render() {
    const currentMovie = movieStore.state.currentMovie
    if (!currentMovie) return null // check if currentMovie is defined

    const currentImdbId = currentMovie.imdbID // 현재 보고 있는 영화의 imdbID 값
    const movies = movieStore.state.movies // 전체 영화 객체 데이터

    // 현재 보고 있는 영화의 인덱스를 찾습니다.
    const currentIndex = movies.findIndex(
      movie => movie.imdbID === currentImdbId
    )

    if (currentIndex !== -1 && currentIndex < movies.length - 1) {
      // 다음 영화 객체 데이터의 imdbID 값을 가져옵니다.
      const nextMovieImdbId = movies[currentIndex + 1].imdbID

      // 다음 영화를 보기 위한 URL을 생성합니다.
      const nextMovieUrl = `${window.location.pathname}?imdbID=${nextMovieImdbId}`
    } else {
      return null // return null if the current movie is the last one
    }
  }
}
