/**
 * 檔案負責人: 柯政安
 * 此元件用來顯示讀取中的繞圈
 */

import React from 'react'
function Spinner({ text }) {
  return (
    <div className="d-flex flex-column align-items-center  my-5">
      <div className="my-5">
        <div className="spinner-grow text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <h2>{text}</h2>
    </div>
  )
}

export default Spinner
