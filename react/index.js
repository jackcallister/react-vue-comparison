import React from 'react'
import { render } from 'react-dom'
import { observable } from 'mobx'
import { Provider } from 'mobx-react'
import Increment from './Increment'
import Counter from './Counter'

const state = observable({
  count: 1,
})

state.increment = () => {
 state.count += 1
}

// Async
setTimeout(() => {
  state.count = 10
}, 5000)

const App = () => {
  return (
    <div>
      <Increment title='Click me...' />
      <Counter />
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider state={state}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
})
