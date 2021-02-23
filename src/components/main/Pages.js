/**
 * 檔案負責人: 柯政安
 * 分頁元件
 * 根據父元件的資料產生相對應的頁數按鈕
 */

import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'

function Pages({ pages = 1, changePage }) {
  const [active, setActive] = useState(1)
  let items = []
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={
          number === active
            ? () => {}
            : (e) => {
                changePage(number)
                setActive(number)
              }
        }
      >
        {number}
      </Pagination.Item>
    )
  }

  return (
    <div className="pages-bar d-flex justify-content-center">
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default Pages
