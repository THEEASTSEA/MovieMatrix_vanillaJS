import Component from '../core/Component'
import Search from '../components/Search'

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'SEARCH',
            href: '#/'
          },
          {
            name: 'MY MOVIE',
            href: '#/mymovie'
          },
          {
            name: 'ABOUT',
            href: '#/about'
          }
        ]
      }
    })
    window.addEventListener('popstate', () => {
      this.render()
    })
  }
  render() {
    this.el.innerHTML = /*html*/ `
    <a href="#/" class="logo"></a>
    <nav>
      <ul>
        ${this.state.menus
          .map(menu => {
            const href = menu.href.split('?')[0]
            const hash = location.hash.split('?')[0]
            const isActive = href === hash

            return /*html*/ `
          <li>
            <a class="${isActive ? 'active' : ''}" href="${menu.href}"> ${
              menu.name
            } </a>
          </li>
          `
          })
          .join()
          .replace(',', '')
          .replace(',', '')}
      </ul>
      <a href="#/about" class="user">
        <img src="https://tistory1.daumcdn.net/tistory/6081640/attach/3f3363ce559e4391a84004653065d4a4" alt="user">
      </a>
    </nav>
    `
    this.el.classList.add('header')
  }
}
