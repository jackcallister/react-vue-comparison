import { h, render, Component } from 'preact'
import { connect } from 'mobx-preact'

class Increment extends Component {

  render({ title, store: { increment } }) {

    return (
      <button onClick={() => { increment() }}>{title}</button>
    )
  }
}

export default connect(["store"], Increment)
