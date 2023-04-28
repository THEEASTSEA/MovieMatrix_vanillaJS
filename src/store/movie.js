import Store from '../core/Store.js'

const store = new Store({
  searchText: '',
  searchYear: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: 'SEARCH FOR THE MOVIE TITLE!'
})

export default store

export const searchMovies = async page => {
  store.state.loading = true
  store.state.page = page
  if (page === 1) {
    // 새로운 검색, 기존 검색 결과 초기화
    store.state.movies = []
    store.state.message = ''
  }
  const defaultPosterUrl =
    'https://lh3.googleusercontent.com/hAlBrNVUAJIixL329Hnp136C4LSb-_7GrAiO-8IJjjBzyIyNb13gz2NVj_4CMyl_pn7Nn6a3XTX_hDAARBzvpHAQSMbd4DcKWtxelRX79g'

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=7035c60c&s=${store.state.searchText}&y=${store.state.searchYear}&page=${page}`
  )
  try {
    const { Search, totalResults, Response, Error } = await res.json()
    if (Response === 'True') {
      store.state.movies = [
        ...store.state.movies.filter(movie => movie != null), // null이나 undefined를 걸러냄
        ...(Search || []).map(movie => ({
          ...movie,
          Poster: movie.Poster !== 'N/A' ? movie.Poster : defaultPosterUrl
          // 포스터 이미지가 없을 경우 기본 이미지로 대체
        }))
      ]
      store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    } else {
      store.state.message = Error
    }
  } catch {
    console.log('searchMovies error', error)
  } finally {
    store.state.loading = false
  }
}

export const getMovieDetails = async id => {
  try {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=7035c60c&i=${id}&plot=short`
    )
    store.state.movie = await res.json()
  } catch (error) {
    console.log('getMovieDetails error:', error)
  }
}
