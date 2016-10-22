import React from 'react'
import { observer } from 'mobx-react'

const Increment = ({ title, state: { counter, increment } }) => {
  return (
    <button onClick={() => { increment() }}>{title}</button>
  )
}

export default observer(["state"], Increment)
