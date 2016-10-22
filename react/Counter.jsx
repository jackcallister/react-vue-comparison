import React from 'react'
import { observer } from 'mobx-react'

const Counter = ({ state: { count } }) => {
  return (
    <p>{count}</p>
  )
}

export default observer(['state'], Counter)
