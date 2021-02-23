import React, { useState, useEffect } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Spinner from '../../main/Spinner'
import MyItineraryList from './MyItineraryList'

function MyItineraryTabs() {
  const memberId = JSON.parse(localStorage.getItem('userData')).newsId
  const [isLoading, setIsLodging] = useState(1)
  const [myItinData, setMyItinData] = useState([])
  const [privateData, setPrivateData] = useState([])
  const [publishData, setPublishData] = useState([])
  function handleTime(time) {
    let timeAll = Array.from(time.substr(0, 8))
    timeAll.splice(6, 0, '/')
    timeAll.splice(4, 0, '/')
    return timeAll.join('')
  }
  async function getMyItin() {
    try {
      const response = await fetch(
        `http://localhost:5000/itinerary/myItin/${memberId}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        console.log('getData from DB')
        let data = await response.json()
        console.log(data)
        if (data.length > 0) {
          let privateTemp = []
          let publishTemp = []
          data.forEach((item) => {
            item.establish_time = handleTime(item.establish_time)
            if (item.publish_time !== null) {
              item.publish_time = handleTime(item.publish_time)
              publishTemp.push(item)
            } else {
              privateTemp.push(item)
            }
          })
          setMyItinData(data)
          setPrivateData(privateTemp)
          setPublishData(publishTemp)
          setIsLodging(0)
        } else {
          setIsLodging(3)
        }
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getMyItin()
  }, [])
  return isLoading === 1 ? (
    <Spinner text={'讀取中'} />
  ) : (
    <>
      <div className="Mef-Tab-style">
        <Tabs defaultActiveKey="itineraryMine" id="uncontrolled-tab-example">
          <Tab eventKey="itineraryMine" title="我的行程">
            <MyItineraryList myItinData={myItinData} tab={'all'} />
          </Tab>
          <Tab eventKey="itineraryPrivate" title="未發表">
            <MyItineraryList myItinData={privateData} tab={'mine'} />
          </Tab>
          <Tab eventKey="itineraryPublish" title="已發表">
            <MyItineraryList myItinData={publishData} tab={'publish'} />
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
export default MyItineraryTabs
