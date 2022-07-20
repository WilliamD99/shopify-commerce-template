import React from 'react'

function Error({message}) {
  return (
    <div>An error has occurred: {message}</div>
  )
}

export default React.memo(Error)
