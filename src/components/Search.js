import Component from '../core/Component'
import movieStore, { searchMovies } from '../store/movie'

export default class Search extends Component {
  render() {
    this.el.classList.add('search')
    this.el.innerHTML = /*html*/ `
      <input value="${movieStore.state.searchText}" class="searchText" type="text" placeholder="TITLE">
      <input value="${movieStore.state.searchYear}" class="searchYear" type="text" placeholder="YEAR(OPT)">
      <button class="btn btn-primary"><span class="material-symbols-outlined">
captive_portal
</span></button>
    `

    const inputTextEl = this.el.querySelector('.searchText')
    const inputYearEl = this.el.querySelector('.searchYear')

    inputTextEl.addEventListener('input', () => {
      movieStore.state.searchText = inputTextEl.value
    })
    inputTextEl.addEventListener('keydown', event => {
      if (event.key === 'Enter' && movieStore.state.searchText.trim()) {
        searchMovies(1)
        searchMovies(2)
      }
    })

    inputYearEl.addEventListener('input', () => {
      movieStore.state.searchYear = inputYearEl.value
    })

    inputYearEl.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        searchMovies(1)
        searchMovies(2)
      }
    })

    const buttonEl = this.el.querySelector('button')
    buttonEl.addEventListener('click', () => {
      if (movieStore.state.searchText.trim()) {
        searchMovies(1)
        searchMovies(2)
      }
    })
  }
}
