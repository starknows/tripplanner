//通知鈴鐺表單
import React, { useState, useEffect } from 'react'
import './newnotice.scss'
import { useHistory } from 'react-router-dom'

function NewNotice({
  id = 1, //資料的id
  time1 = -1, //第一個日期
  time2 = -1, //第二個日期
  price = -1, //價格
}) {
  let history = useHistory()
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
      <tbody>
        {metbJoined.map((e, index) => (
          <tr className=" new-not-flex">
            <td className="not-td-left">{e.tb_themeName}</td>
            <td className="not-td-right">
              {metbJoined[0].tb_dateBegin.slice(5, 7) +
                '/' +
                metbJoined[0].tb_dateBegin.slice(8, 10)}
            </td>
          </tr>
        ))}
      </tbody>
    </>
  )

  return (
    <>
      <div className="">
        <table className="not-toble-ma-bt table-hover">
          <tr>
            {/* <th scope="col">No.</th> */}
            <th>旅行日期</th>
            <th className="text-right" scope="col">
              時間
            </th>
          </tr>
          {display}
        </table>
      </div>
    </>
  )
}

export default NewNotice
