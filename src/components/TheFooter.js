import Component from '../core/Component'
import aboutStore from '../store/about'

export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: 'footer'
    })
  }
  render() {
    const { github, blog } = aboutStore.state
    this.el.innerHTML = /*html*/ `
      <div>
          <a href="${github}">GITHUB</a>
      </div>
      <div>
          <a href="${blog}">${new Date().getFullYear()} DONGHAE</a>
      </div>
    `
    this.el.classList.add('footer')
  }
}
