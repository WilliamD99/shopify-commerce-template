import React from 'react'

function DataLoading() {

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='loading'>
      </div>
    </div>
  )
}

export default React.memo(DataLoading)
