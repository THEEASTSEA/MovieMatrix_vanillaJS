import Component from '../core/Component'
import movieStore, { searchMovies } from '../store/movie'

export default class MovieListMore extends Component {
  constructor() {
    super({
      tagName: 'button'
    })
    movieStore.subscribe('pageMax', () => {
      // movieStore.state.page < movieStore.state.pageMax
      const { page, pageMax } = movieStore.state
      if (page < pageMax) {
        this.el.classList.remove('hide')
      } else {
        this.el.classList.add('hide')
      }
    })
    window.addEventListener('scroll', () => {
      // 더 이상 로드할 영화가 없는 경우 MovieListMore를 숨깁니다.
      if (movieStore.state.page >= movieStore.state.pageMax) {
        return
      }
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 100 && !this.isLoading) {
        // scrolltop은 스크롤이 얼마나 내려갔는지를 나타내는 속성
        // clientHeight는 브라우저 화면의 높이
        // scrollHeight는 스크롤이 있는 영역의 전체 높이
        // 스크롤이 맨 아래에 위치하고 있고, 로딩 중이 아닐 때
        this.isLoading = true
        searchMovies(movieStore.state.page + 1).then(() => {
          this.isLoading = false
        })
      }
    })
  }
  render() {
    this.el.classList.add('btn', 'btn-more', 'hide')
    this.el.textContent = '⋁'
    this.isLoading = false
  }
}
