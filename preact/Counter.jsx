import { h, render, Component } from 'preact'
import { connect } from 'mobx-preact'

class Counter extends Component {

  render({ store: { count } }) {

    return (
      <p>{count}</p>
    )
  }
}

export default connect(["store"], Counter)
