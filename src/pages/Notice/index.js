//通知表單
import React, { useState, useEffect } from 'react'
import Pages from '../../components/main/Pages'
import { Table } from 'react-bootstrap'
import './notice.scss'

// let cardData = require('../../components/Itinerary/testJsonData.json')
// let handleTestData = cardData[2].data

function Notice({
  id = 1, //資料的id
  time1 = -1, //第一個日期
  time2 = -1, //第二個日期
  price = -1, //價格
}) {
  const [metbJoined, setMetbJoined] = useState([])
  let type = 'travelBuddies'
  if (time1 === -1) {
    type = 'travelBuddies'
  } else if (time2 !== -1) {
    type = 'travelBuddies'
    // 改
  } else if (price !== -1) {
    type = 'travelBuddies'
  }
  // let detailUrl = `/${type}/view/${id}`
  async function gettbJoined(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/travelBuddies/${id}`,
        {
          method: 'get',
        }
      )
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

  let display = (
    <>
      {metbJoined.map((e, index) => (
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
      ))}
    </>
  )
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
          <Pages className="not-pages" />
        </div>
      </Table>
    </>
  )
}

export default Notice
