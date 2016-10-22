import { h, render, Component } from 'preact'
import { observable } from 'mobx'
import { Provider } from 'mobx-preact'
import Increment from './Increment'
import Counter from './Counter'

const store = observable({
  count: 1,
})

store.increment = () => {
 store.count += 1
}

// Async
setTimeout(() => {
  store.count = 10
}, 5000)

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <div>
        <Increment title='Click me...' />
        <Counter />
      </div>
    </Provider>,
    document.getElementById('app')
  )
})
