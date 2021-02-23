//通知表單
import React, { useState, useEffect } from 'react'
import Pages from '../../components/main/Pages'
import { Table } from 'react-bootstrap'
import './notice.scss'

function Notice({ itemPerPage = 6 }) {
  const [metbJoined, setMetbJoined] = useState([])

  async function gettbJoined() {
    try {
      const response = await fetch(`http://localhost:5000/travelBuddies`, {
        method: 'get',
      })
      if (response.ok) {
        const data = await response.json()
        setMetbJoined(data)
      }
    } catch (err) {
      // alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  useEffect(() => {
    gettbJoined()
  }, [])

  //pages
  let [showRange, setShowRange] = useState([0, itemPerPage])
  let dataLength = metbJoined.length
  let totalPage = Math.floor(dataLength / itemPerPage)
  function changePage(orderPage) {
    setShowRange([(orderPage - 1) * itemPerPage, orderPage * itemPerPage])
    window.scrollTo(0, 0)
  }

  let display = <></>

  display = metbJoined.map((e, index) => {
    if (index < showRange[0] || index >= showRange[1]) {
      return null
    } else {
      return (
        <tbody>
          <tr key={index}>
            <td>{e.id}</td>
            <td className="not-td-left">{e.tb_themeName}</td>
            <td className="not-td-right">
              {metbJoined[0].tb_dateBegin.slice(0, 4) +
                '/' +
                metbJoined[0].tb_dateBegin.slice(5, 7) +
                '/' +
                metbJoined[0].tb_dateBegin.slice(8, 10) +
                '-' +
                metbJoined[0].tb_dateEnd.slice(0, 4) +
                '/' +
                metbJoined[0].tb_dateEnd.slice(5, 7) +
                '/' +
                metbJoined[0].tb_dateEnd.slice(8, 10)}
            </td>
          </tr>
        </tbody>
      )
    }
  })

  return (
    <>
      <Table className="table table-striped">
        <div className="notice-style">
          <thead>
            <tr className="not-table-mrove">
              <th className="not-id">No.</th>
              <th className="text-left">我的旅歷</th>
              <th className="text-right-time">時間</th>
            </tr>
          </thead>
          {display}
          <Pages pages={totalPage} changePage={changePage} />
        </div>
      </Table>
    </>
  )
}

export default Notice
