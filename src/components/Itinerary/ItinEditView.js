/**
 * 檔案負責人: 柯政安
 * 此元件是完整的私人行程編輯頁面呈現結果，用來組裝其他介面小元件
 * 根據父元件所給予的isNew決定是否要向資料庫取得資料或給予空的行程表
 */

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ItinEditorHeader from './ItinEditorHeader'
import ItinEditor from './ItinEditor'
import BigMap from './BigMap'
import Spinner from '../main/Spinner'
import NoData from '../main/NoData'
function ItinEditView({ isNew = true }) {
  let history = useHistory()
  const [dataFromUser, setDataFromUser] = useState([
    { title: '第 1 日', data: [] },
  ])
  const [isLoading, setIsLoading] = useState(1)
  const [title, setTitle] = useState()
  let { itin_id } = useParams()
  //取得特定行程資料
  async function getDataFromDB() {
    try {
      const response = await fetch(
        `http://localhost:5000/itinerary/${itin_id}`,
        {
          method: 'get',
          mode: 'cors',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setTitle(data[0].title)
        setDataFromUser(data[1])
        // 判斷是否有資料，如果資料長度為0，則讀取狀態為3，查無資料的圖片
        setTimeout(() => {
          if (data.length === 0) {
            setIsLoading(3)
          } else {
            setIsLoading(0)
          }
        }, 0)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  useEffect(() => {
    if (!isNew) {
      getDataFromDB()
    }
  }, [])
  //將使用者排好的行程資料處理成後端要的資料結構
  function handleDataToDB() {
    if (dataFromUser[0].data.length === 0) return
    let dataToDB = []
    let itinData = {
      id: itin_id,
      member_id: 1,
      title: document.querySelector('.itin-title-input').value
        ? document.querySelector('.itin-title-input').value
        : '我的新行程',
      region: '',
      location: dataFromUser[0].data[0].location,
      duration: dataFromUser.length,
    }
    const boxData = dataFromUser
    //將已經重新拖曳排序過的行程index覆寫成新的排序
    boxData.forEach((element, indexDay) => {
      element.data.forEach((ele, indexBox) => {
        ele.day = indexDay
        ele.order = indexBox
      })
    })
    dataToDB = [itinData, boxData]
    // 整理完後再丟給後端
    sendDataToDB(dataToDB)
  }
  async function sendDataToDB(dataToDB) {
    let reqUrl = `http://localhost:5000/itinerary/createItin`
    let reqBody = {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToDB),
    }
    //如果是修改的話，把路由跟method蓋掉
    if (!isNew) {
      reqUrl = `http://localhost:5000/itinerary/edit`
      reqBody.method = 'put'
    }
    try {
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        const data = await response.json()
        history.push(`/itinerary/my/${data.itin_id}`)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  //原先打算拆成兩種顯示，後來合併，變數名則沿用
  const displayNewView = (
    <div className="itin-editview-wrapper">
      <BigMap dataFromUser={dataFromUser} setDataFromUser={setDataFromUser} />
      <ItinEditorHeader
        isEdit={true}
        isPublish={false}
        isMe={true}
        title={title}
        setTitle={setTitle}
        handleSubmit={handleDataToDB}
      />
      <ItinEditor
        isEdit={true}
        tempData={dataFromUser}
        setTempData={setDataFromUser}
      />
    </div>
  )
  // 如果是新增行程就直接給介面
  // 如果是修改就先顯示spinner
  if (isNew) {
    return displayNewView
  } else {
    if (isLoading === 1) {
      return <Spinner text={'讀取中'} />
    } else if (isLoading === 0) {
      return displayNewView
    } else {
      return <NoData text={'查無此行程'} />
    }
  }
}

export default ItinEditView
