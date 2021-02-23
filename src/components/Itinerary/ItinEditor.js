/**
 * 檔案負責人: 柯政安
 * 行程表互動元件
 * 在使用者製作行程表以及檢視行程時，出現在畫面左手邊的行程表
 * 功能：
 * 1. 排序 - 利用react-beautiful-dnd套件製作排序的視覺假象，並利用陣列操作真實資料，讓排序功能實現
 * 2. 刪除 - 以React Bootstrap的modal元件實作comfirmBox元件，在確認執行後執行傳入的callback
 * 3. 開閉 - 利用js直接控制div的className，以純css產生開啟與關閉的效果
 */
import React, { useEffect, useState } from 'react'
import SpotsBox from './SpotsBox'
import ConfirmBox from '../main/ConfirmBox'
import { FaTimesCircle, FaPlusCircle } from 'react-icons/fa'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
//
//測試用假資料
import fakeTestingData from './testBoxData'
//
function ItinEditor({
  isEdit = false,
  tempData = fakeTestingData,
  setTempData,
}) {
  //處理confirm
  const [modalShow, setModalShow] = useState(false) //設定modal的開啟狀態
  const [modalType, setModalType] = useState(<></>) //建立comfirmBox元件樣貌，後續可根據不同狀況產生不同的comfirmBox內容
  //
  function createModal(props) {
    //將預先建立的空modal樣貌改寫成所需的模樣
    setModalType(
      <ConfirmBox
        show={modalShow} //傳入開啟狀態
        onHide={setModalShow} //傳入改變開啟狀態的function
        resetdom={setModalType} //傳入改變comfirmBox樣貌用的function
        {...props} //將傳入的callback或callback所需的參數等繼續往下傳
      />
    )
  }
  //若根據需求產生了comfirmBox元件樣貌、且不是空div，則打開modal
  useEffect(() => {
    if (modalType !== <></>) {
      setModalShow(true)
    }
  }, [modalType])
  //
  //處理bar開關
  //製作此元件時還不會使用classList，故當時是直接將不同的className列表寫死，並根據語意製作成陣列的0跟1
  const classIsClose = [
    'itin-editor-daybox d-flex justify-content-between align-items-center',
    'itin-editor-daybox d-flex justify-content-between align-items-center daybox-close',
  ]
  //處理box選擇
  const classIsSelect = ['testDragBox', 'testDragBox box-select']
  //拖曳後處理數據
  //根據套件所給予的拖曳起點index起點、終點index來操作陣列內容物的實際變更
  //droppableId可用來判斷不同的放置區域 (此處主要是用以判斷不同日子的移動)
  function handleOnDragEnd(result) {
    if (!result.destination) return
    const wrapSourceIndex = result.source.droppableId.substring(4)
    const wrapDestinIndex = result.destination.droppableId.substring(4)
    const originArray = Array.from(tempData) //將目前所有行程複製一份出來操作
    const [reorderItem] = originArray[wrapSourceIndex].data.splice(
      result.source.index,
      1
    )
    originArray[wrapDestinIndex].data.splice(
      result.destination.index,
      0,
      reorderItem
    )
    setTempData(originArray) //將操作過的陣列寫回當前的所有行程狀態
  }
  //新增新的一日，並計算目前的日數自動產生新的標題
  function dayPlus() {
    const originArray = Array.from(tempData)
    const nowDay = originArray.length
    originArray.push({ title: `第 ${nowDay + 1} 日`, data: [] })
    setTempData(originArray) //將操作後的陣列寫回
  }
  //刪除某一日
  function dayDelete(day) {
    const originArray = Array.from(tempData)
    const nowDay = originArray.length
    if (nowDay <= 1) {
      return
    } else {
      originArray.splice(day, 1)
      setTempData(originArray) //將操作後的陣列寫回
    }
  }
  //根據day與box的index刪除某一個行程
  function boxDelete(day, box) {
    const originArray = Array.from(tempData)
    originArray[day].data.splice(box, 1)
    setTempData(originArray)
  }
  //編輯中狀態的顯示樣式
  const displayEdit = (
    <div className="itin-editor-wrapper custom-box-shadow">
      {/* 拖曳套件作用範圍設定 */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {tempData.map((data, dayIndex) => (
          <div key={dayIndex}>
            <div
              //點擊每一日的標題可以收起當日的所有行程 (display:none)
              onClick={(e) => {
                if (e.target.className === classIsClose[0]) {
                  e.target.className = classIsClose[1]
                } else if (e.target.className === classIsClose[1]) {
                  e.target.className = classIsClose[0]
                } else {
                  return
                }
              }}
              className={classIsClose[0]}
            >
              <span>{`第 ${dayIndex + 1} 日`}</span>
              <span
                className="box-close-btn"
                onClick={() => {
                  //若只剩下1日則不給刪除
                  if (tempData.length > 1) {
                    //第27行製作的comfirmBox元件實現介面，可自行傳入相關參數與callback
                    createModal({
                      header: '請再次確認',
                      text: `是否刪除第 ${dayIndex + 1} 日？`,
                      cb: dayDelete, //如果使用者在跳出的modal按下確認，就會執行此callback
                      cbprops: [dayIndex], //將給予callback的參數
                    })
                  }
                }}
              >
                <FaTimesCircle size={26} />
              </span>
            </div>
            {/* 設定容許放置可拖曳元件的區域，並給予獨特id */}
            <Droppable droppableId={'wrap' + dayIndex}>
              {(provided) => (
                <div
                  className="itin-editor-spotsWapper"
                  // 根據套件說明加入的內容
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.data.map((element, index) => (
                    <div key={index}>
                      {/* 設定可拖曳元件，並給予獨特id */}
                      <Draggable
                        draggableId={'box' + dayIndex + index}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className={classIsSelect[0]}
                            // 根據套件說明加入的內容
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {/* 自製的景點元件 */}
                            <SpotsBox
                              index={[dayIndex, index]}
                              data={element}
                              isEdit={isEdit}
                              dataFromUser={tempData}
                              setDataFromUser={setTempData}
                              doDelete={() => {
                                //將產生comfirmBox的function傳入，讓刪除day跟刪除行程可以共用同一個預留modal位置，避免不必要的浪費
                                createModal({
                                  header: '請再次確認',
                                  text: `是否刪除此行程？`,
                                  cb: boxDelete,
                                  cbprops: [dayIndex, index],
                                })
                              }}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {/* 根據套件說明加入的佔位用內容，避免不自然的拖曳視覺效果 */}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
      <div className="itin-editor-daybox dayPlus d-flex align-items-center">
        <span onClick={dayPlus}>
          <FaPlusCircle size={26} />
        </span>
      </div>
      {/* modal的預留位置 */}
      {modalType}
    </div>
  )
  //非編輯中狀態的顯示樣式
  const displayNotEdit = (
    <div className="itin-editor-wrapper custom-box-shadow">
      {tempData.map((data, dayIndex) => (
        <div key={dayIndex}>
          <div
            onClick={(e) => {
              if (e.target.className === classIsClose[0]) {
                e.target.className = classIsClose[1]
              } else if (e.target.className === classIsClose[1]) {
                e.target.className = classIsClose[0]
              } else {
                return
              }
            }}
            className={classIsClose[0]}
          >
            <span>{data.title}</span>
          </div>
          <div className="itin-editor-spotsWapper">
            {data.data.map((element, index) => (
              <div
                key={index}
                className={classIsSelect[0]}
                onClick={(e) => {
                  document
                    .querySelectorAll('.itin-detailPicText-show')
                    .forEach((element) => {
                      element.classList.remove('itin-detailPicText-show')
                    })
                  if (document.querySelector('.box-select')) {
                    document.querySelector('.box-select').className =
                      classIsSelect[0]
                  }
                  e.currentTarget.className = classIsSelect[1]
                  if (document.querySelector(`.boxInfo${dayIndex}${index}`))
                    document
                      .querySelector(`.boxInfo${dayIndex}${index}`)
                      .classList.add('itin-detailPicText-show')
                  if (document.querySelector(`.dayTitle${dayIndex}`))
                    document
                      .querySelector(`.dayTitle${dayIndex}`)
                      .classList.add('itin-detailPicText-show')
                }}
              >
                <SpotsBox
                  index={[dayIndex, index]}
                  data={element}
                  isEdit={isEdit}
                  dataFromUser={tempData}
                  setDataFromUser={setTempData}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
  return isEdit ? displayEdit : displayNotEdit //根據傳入狀態不同決定顯示樣式
}

export default ItinEditor
// 檔案負責人: 柯政安
