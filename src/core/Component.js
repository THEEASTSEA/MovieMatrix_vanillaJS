export default class Component {
  constructor(payload = {}) {
    const { tagName = 'div', state = {}, props = {} } = payload
    this.el = document.createElement(tagName)
    this.state = state // payload를 통해 전달받은 state를 this.state에 저장
    this.props = props // payload를 통해 전달받은 props를 this.props에 저장
    this.render()
  }
  render() {
    // 확장용
  }
}
