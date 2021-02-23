/**
 * 檔案負責人: 柯政安
 * 此元件是完整的已發表行程頁面呈現結果，用來組裝其他介面小元件
 * 根據父元件所給予的isEdit決定顯示的樣貌
 * 此頁面依照商業邏輯無法修改行程排序，僅能修改行程簡介跟照片
 */
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import ItinEditorHeader from './ItinEditorHeader'
import ItinEditorBasicData from './itinEditorBasicData'
import ItinEditor from './ItinEditor'
import ItinEditorDetail from './ItinEditorDetail'
import Spinner from '../main/Spinner'
import NoData from '../main/NoData'

function ItinPublishView({ isEdit = false }) {
  const [dataFromDB, setgDataFromDB] = useState([])
  const [isLoading, setIsLoading] = useState(1)
  const [isPublish, setIsPublish] = useState(true)
  const [isMe, setIsMe] = useState(false)
  let { itin_id } = useParams()
  let history = useHistory()
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
        setgDataFromDB(data)
        //確認是否為自己發表的行程
        if (JSON.parse(localStorage.getItem('userData'))) {
          if (
            data[0].member_id ===
            JSON.parse(localStorage.getItem('userData')).newsId
          ) {
            setIsMe(true)
          }
        }
        if (data[0].publish_time === null) {
          setIsPublish(false)
        }
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
  // 修改附加照片與簡介時，先行處理成後端需求的資料結構
  async function handleDataToDB() {
    let dataReadyToSend = [] //準備用來承接所有資料
    //行程的大標題與主視覺等基本資料
    let dataItin = {
      id: dataFromDB[1][0].data[0].itinerary_id,
      info: document.querySelector('.itin-basicdata-text').value,
      imageIndex:
        '-1' && document.querySelector('input[name="itin-kv"]:checked').value,
    }
    //內部各個小行程的詳細資料，包含文字簡介與圖片
    let dataBox = []
    //用formData的方式來傳照片至後端
    let formData = new FormData()
    //用for迴圈確認所有文字簡介跟照片欄位是否有使用者輸入的資料，並記錄有資料的索引值
    for (let i = 0; i < dataFromDB[1].length; i++) {
      for (let j = 0; j < dataFromDB[1][i].data.length; j++) {
        let text = document.querySelector(`.textarea-${i}${j}`).value
        let image = false
        if (document.querySelector(`.itin-input-${i}${j}`).files[0]) {
          let imgFile = document.querySelector(`.itin-input-${i}${j}`)
          formData.append('file', imgFile.files[0])
          image = true
        }
        dataBox.push({
          day: i,
          order: j,
          image: image,
          text: text,
        })
      }
    }
    //先將使用者給的照片全部傳到後端
    try {
      let reqUrl = `http://localhost:5000/upload/itinBox`
      let reqBody = {
        method: 'post',
        body: formData,
      }
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        // 確認照片上傳成功後，取得檔名與後端路徑
        // 準備將取得的圖片路徑存到資料庫中的行程資料內
        // 在上面的for迴圈中已有特別記錄有需要新增照片的資料的image欄位為true
        // 這邊按照順序直接將true值取代為正式的路徑準備寫入資料庫
        // 沒有上傳圖片的部分則在資料庫中準備寫入NULL
        const data = await response.json()
        dataBox.forEach((item) => {
          if (item.image === true) {
            item.image = `${data.url}` + data.name.shift()
          } else {
            item.image = null
          }
        })
        dataReadyToSend = [dataItin, dataBox]
        sendDataToDB(dataReadyToSend)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  async function sendDataToDB(dataToDB) {
    let reqUrl = `http://localhost:5000/itinerary/publish/${itin_id}`
    let reqBody = {
      method: 'put',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToDB),
    }
    try {
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        // 若新增成功，直接將新資料蓋過前台已取得得資料，可確保畫面上即時更新，不跳出舊資料
        const data = await response.json()
        let tempData = dataFromDB
        tempData[0].publish_time = data.time
        tempData[0].info = dataToDB[0].info
        dataToDB[1].forEach((item) => {
          if (item.text !== tempData[1][item.day].data[item.order].info) {
            tempData[1][item.day].data[item.order].info = item.text
          }
          if (item.image !== null) {
            tempData[1][item.day].data[item.order].image = item.image
          }
        })
        setgDataFromDB(tempData)
        setIsPublish(true)
        isEdit = false
        history.push(`/itinerary/view/${itin_id}`)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }
  // 此部分已在子元件內藉由basicFetch元件取代功能
  async function unPublish(itin_id) {
    let reqUrl = `http://localhost:5000/itinerary/unpublish/${itin_id}`
    let reqBody = {
      method: 'put',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itin_id),
    }
    try {
      const response = await fetch(reqUrl, reqBody)
      if (response.ok) {
        history.push(`/itinerary/my/${itin_id}`)
      }
    } catch (err) {
      console.log('fetch err')
    }
  }

  const displayView = dataFromDB.length > 0 && (
    <div className="itin-editor-frame">
      <ItinEditorHeader
        isEdit={isEdit}
        isPublish={true}
        isMe={isMe}
        title={dataFromDB[0].title}
        handleSubmit={isEdit ? handleDataToDB : unPublish}
      />
      <main className="d-flex justify-content-between">
        <div>
          <ItinEditorBasicData
            isEdit={isEdit}
            isPublish={isPublish}
            itinData={dataFromDB[0]}
          />
          <ItinEditor
            isEdit={false} //任何情況下的publish頁都不需要修改功能
            tempData={dataFromDB[1]}
          />
        </div>
        <div>
          <ItinEditorDetail isEdit={isEdit} boxData={dataFromDB[1]} />
        </div>
      </main>
    </div>
  )

  useEffect(() => {
    getDataFromDB()
  }, [])

  if (isLoading === 0) {
    return displayView
  } else if (isLoading === 1) {
    return <Spinner text={'讀取中'} />
  } else {
    return <NoData text={'查無此行程'} />
  }
}

export default ItinPublishView
