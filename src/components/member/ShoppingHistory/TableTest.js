import React from 'react'
import { Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

function TableTest({
  orderId, //資料的id
  ticketNumber, //訂單編號
  PurchaseDate, //購買日期
  many, //張數
  price, //價格
}) {
  let detailUrl = `/myAccount/historyOrder/${orderId}`

  return (
    <>
      <td>{orderId}</td>
      <td>{ticketNumber}</td>
      <td>{PurchaseDate}</td>
      <td>{many}張</td>
      <td>NT$ {price}</td>
      <td>
        <Link to={detailUrl}>
          <Button variant="info">明細</Button>
        </Link>
      </td>
    </>
  )
}

export default TableTest
