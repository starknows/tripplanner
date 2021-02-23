import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Pages from '../../main/Pages'
import './history-table.scss'
import TableTest from './TableTest'
function ShoppingHistory() {
  const [historyOrder, setHistoryOrder] = useState([])

  async function getHistoryOrder(props) {
    try {
      const response = await fetch(`http://localhost:5000/historyOrder`, {
        method: 'get',
      })
      if (response.ok) {
        const data = await response.json()
        setHistoryOrder(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getHistoryOrder()
  }, [])
  let itemPerPage = 9
  let [showRange, setShowRange] = useState([0, itemPerPage])
  let dataLength = historyOrder.length
  let totalPage = Math.floor(dataLength / itemPerPage) + 1
  if (dataLength % itemPerPage === 0) totalPage -= 1
  function changePage(orderPage) {
    setShowRange([(orderPage - 1) * itemPerPage, orderPage * itemPerPage])
    window.scrollTo(0, 0)
  }

  return (
    <>
      <div className="table-history">
        <Table className="table table-bordered table-striped">
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th>訂單編號</th>
              <th>購買日期</th>
              <th>張數</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {historyOrder.map((v, i) => {
              let isPublish = '是'
              if (v.publish_time === null) isPublish = '否'
              if (i < showRange[0] || i >= showRange[1]) {
                return null
              } else {
                return (
                  <tr key={i}>
                    <TableTest
                      orderId={v.id}
                      PurchaseDate={v.purchaseDate}
                      ticketNumber={v.ticketNumber}
                      many={v.many}
                      price={v.price}
                    />
                  </tr>
                )
              }
            })}
          </tbody>
        </Table>
        <Pages pages={totalPage} changePage={changePage} />
      </div>
    </>
  )
}

export default ShoppingHistory
