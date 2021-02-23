import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function HomeBtn() {
  let history = useHistory()
  function Goitinerary22() {
    history.push('/itinerary')
  }
  return (
    <>
      <div className="row justify-content-around">
        <button onClick={Goitinerary22} className="Homebtn">
          更多
        </button>
      </div>
    </>
  )
}
export default HomeBtn
