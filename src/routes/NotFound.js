import Component from '../core/Component'

export default class NotFound extends Component {
  render() {
    this.el.classList.add('not-found')
    this.el.innerHTML = /*html*/ `
      <div class="inner">
        <h1>SORRY..</h1>
        <p>Page Not Found.</p>
      </div>
    `
  }
}
