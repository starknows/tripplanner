/**
 * 檔案負責人: 柯政安
 * 此元件是完整的私人行程純檢視頁面呈現結果，用來組裝其他介面小元件
 */

import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ItinEditorHeader from './ItinEditorHeader'
import ItinEditor from './ItinEditor'
import DisplayMap from './DisplayMap'
import Spinner from '../main/Spinner'
import NoData from '../main/NoData'

function MyItinView() {
  const [isLoading, setIsLoading] = useState(1)
  const [dataFromDB, setDataFromDB] = useState([])
  const [center, setCenter] = useState({ lat: '', lng: '' })
  const [title, setTitle] = useState()
  let { itin_id } = useParams()
  let history = useHistory()
  //取得行程資料
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
        //私人行程需驗證使用者是否為作者才能檢視，若非作者會顯示無此行程
        if (
          data[0].member_id !==
          JSON.parse(localStorage.getItem('userData')).newsId
        ) {
          setIsLoading(3)
          return
        }
        let laglng = {
          lat: data[1][0].data[0].lat,
          lng: data[1][0].data[0].lng,
        }
        setTitle(data[0].title)
        setDataFromDB(data[1])
        setCenter(laglng)
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
    getDataFromDB()
  }, [])
  function handleSubmit() {
    history.push(`/itinerary/my/${itin_id}`)
  }

  const display = (
    <div className="itin-editview-wrapper">
      <DisplayMap boxData={dataFromDB} center={center} size={'lg'} />
      <ItinEditorHeader
        isEdit={false}
        isPublish={false}
        title={title}
        handleSubmit={handleSubmit}
      />
      <ItinEditor isEdit={false} tempData={dataFromDB} />
    </div>
  )

  if (isLoading === 1) {
    return <Spinner text={'讀取中'} />
  } else if (isLoading === 0) {
    return display
  } else {
    return <NoData text={'查無此行程'} />
  }
}

export default MyItinView
