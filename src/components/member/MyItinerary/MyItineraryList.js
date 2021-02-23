import React, { useState } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import Pages from '../../main/Pages'
import { useHistory } from 'react-router-dom'
import NoData from '../../main/NoData'

function MyItineraryList({ myItinData, tab = 'all' }) {
  let history = useHistory()
  let itemPerPage = 9
  let [showRange, setShowRange] = useState([0, itemPerPage])
  let dataLength = myItinData.length
  let totalPage = Math.floor(dataLength / itemPerPage) + 1
  if (dataLength % itemPerPage === 0) totalPage -= 1
  function changePage(orderPage) {
    setShowRange([(orderPage - 1) * itemPerPage, orderPage * itemPerPage])
    window.scrollTo(0, 0)
  }
  let timeTH = '發表時間'
  if (tab === 'mine') {
    timeTH = '製作時間'
  } else if (tab === 'publish') {
    timeTH = '發表時間'
  }
  const dataDisplay = (
    <Table>
      <thead>
        <tr>
          <th width="50px">No.</th>
          <th width="150px">行程標題</th>
          {tab === 'all' ? <th width="60px">發表</th> : null}
          <th width="120px">{timeTH}</th>
          <th width="60px">地點</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {myItinData.length > 0 &&
          myItinData.map((item, index) => {
            let isPublish = '是'
            if (item.publish_time === null) isPublish = '否'
            if (index < showRange[0] || index >= showRange[1]) {
              return null
            } else {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  {tab === 'all' ? <td>{isPublish}</td> : null}
                  <td>{item.publish_time || item.establish_time}</td>
                  <td>{item.location}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={(e) => {
                        if (item.publish_time === null) {
                          history.push(`/itinerary/my/${item.itin_id}`)
                        } else {
                          history.push(`/itinerary/view/${item.itin_id}`)
                        }
                      }}
                    >
                      查看
                    </Button>
                    <Button
                      variant="info"
                      onClick={(e) => {
                        if (item.publish_time === null) {
                          history.push(`/itinerary/edit/${item.itin_id}`)
                        } else {
                          history.push(`/itinerary/publish/${item.itin_id}`)
                        }
                      }}
                    >
                      編輯
                    </Button>
                    <Button
                      variant="info"
                      onClick={(e) => {
                        if (item.publish_time === null) {
                          history.push(`/itinerary/publish/${item.itin_id}`)
                        } else {
                          console.log('取消發表')
                        }
                      }}
                    >
                      {item.publish_time === null ? '發表' : '收回'}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => {
                        console.log('刪除')
                      }}
                    >
                      刪除
                    </Button>
                  </td>
                </tr>
              )
            }
          })}
      </tbody>
    </Table>
  )

  return (
    <tbody>
      <div className="my-itinerary-table tab-content-travelbuddies">
        {myItinData.length > 0 ? dataDisplay : <NoData text={'查無行程'} />}
      </div>
      <div className="tb-pages">
        <Pages pages={totalPage} changePage={changePage} />
      </div>
    </tbody>
  )
}

export default MyItineraryList
