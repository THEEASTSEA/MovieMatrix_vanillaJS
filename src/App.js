import Component from './core/Component.js'
import TheHeader from './components/TheHeader.js'
import TheFooter from './components/TheFooter.js'

export default class App extends Component {
  render() {
    const routerView = document.createElement('router-view')
    const header = new TheHeader().el
    const footer = new TheFooter().el
    this.el.append(header, routerView, footer)
  }
}
