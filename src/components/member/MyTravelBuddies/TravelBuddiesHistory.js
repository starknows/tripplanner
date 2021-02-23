import React, { useState, useEffect } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import Pages from '../../main/Pages'
import TBButtonRead from './TBButtonRead'
import TBButtonChatroom from './TBButtonChatroom'
import TBHistoryButtonRating from './TBHistoryButtonRating'
import TBHistoryButtonGiveRating from './TBHistoryButtonGiveRating'

function TravelBuddiesHistory() {
  const [tbHistory, settbHistory] = useState([])
  const id = JSON.parse(localStorage.getItem('userData')).newsId
  async function gettbHistory(props) {
    try {
      const response = await fetch(
        `http://localhost:5000/tbmyaccount/tbhistory/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        settbHistory(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  useEffect(() => {
    gettbHistory()
  }, [])
  return (
    <>
      <div className="travelbuddieshistory-outbox tab-content-travelbuddies">
        <Table>
          <thead>
            <tr>
              <th width="60px">No.</th>
              <th width="180px">旅行揪團名稱</th>
              <th width="120px">日期</th>
              <th width="90px">身份</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {tbHistory.length > 0 &&
              tbHistory.map((v, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{v.tb_themeName}</td>
                    <td>
                      {v.tb_dateBegin.slice(0, 4) +
                        '/' +
                        v.tb_dateBegin.slice(5, 7) +
                        '/' +
                        v.tb_dateBegin.slice(8, 10) +
                        ' ' +
                        '-' +
                        ' ' +
                        v.tb_dateEnd.slice(0, 4) +
                        '/' +
                        v.tb_dateEnd.slice(5, 7) +
                        '/' +
                        v.tb_dateEnd.slice(8, 10)}
                    </td>
                    {/* 這邊判斷式要拉session */}
                    <td>{v.tb_ownerId === id ? '揪團主' : '團員'}</td>
                    <td>
                      <TBButtonRead id={v.id} /> <TBButtonChatroom id={v.id} />{' '}
                      <TBHistoryButtonRating id={v.id} />
                      <TBHistoryButtonGiveRating id={v.id} />{' '}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </Table>
      </div>
      <div className="tb-pages">
        <Pages />
      </div>
    </>
  )
}

export default TravelBuddiesHistory
