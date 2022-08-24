import React, { useState } from 'react'
import {CREATED_AT, TITLE, UPDATED_AT, PRODUCT_TYPE} from '../../utils/sort_key'


export default function Sorting({mutateProductNext}) {
  const [sortKey, setSortKey] = useState()

  let handleSort = (e) => {
      setSortKey(e.target.value)
      mutateProductNext.mutate({direction: true, sortKey: e.target.value})
  }

  return (
    <>
      <select value={sortKey} onChange={handleSort}>
          <option value={CREATED_AT}>Date Created Acensding</option>
          <option value={UPDATED_AT}>Date Updated</option>
          <option value={TITLE}>Title</option>
          <option value={PRODUCT_TYPE}>Product Type</option>
      </select>
    </>
  )
}
