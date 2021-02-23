/**
 * 檔案負責人: 柯政安
 * 此元件是每一個可供拖曳的小行程元件的基本樣貌
 * 可接受傳入資料後顯示，並自動處理時間格式
 */

import React, { useEffect } from 'react'
import { FaMapMarkerAlt, FaTimesCircle } from 'react-icons/fa' //  FaCar,FaTrain,FaWalking,

function SpotsBox({
  isEdit = false,
  data,
  index,
  dataFromUser,
  setDataFromUser,
  doDelete,
}) {
  const { title, begin } = data
  //將時間處理成需要的格式
  function handleTime(begin) {
    if (begin.length === 4) {
      let temp = Array.from(begin)
      temp.splice(2, 0, ':')
      return temp.join('')
    } else {
      return begin
    }
  }
  const inputTimeClass = `box-input-time time${index[0]}${index[1]}`
  const inputTitleClass = `box-input-title input${index[0]}${index[1]}`
  useEffect(() => {
    //如果是編輯中，隨時確認畫面上顯示的資料是否與取得的資料同步
    if (isEdit) {
      if (
        document.querySelector(`.input${index[0]}${index[1]}`).value ===
          dataFromUser[index[0]].data[index[1]].title &&
        document.querySelector(`.time${index[0]}${index[1]}`).value ===
          handleTime(dataFromUser[index[0]].data[index[1]].begin)
      ) {
        return
      } else {
        document.querySelector(`.input${index[0]}${index[1]}`).value =
          dataFromUser[index[0]].data[index[1]].title
        document.querySelector(
          `.time${index[0]}${index[1]}`
        ).value = handleTime(dataFromUser[index[0]].data[index[1]].begin)
      }
    }
  }, [dataFromUser])
  // 原本預計根據不同的行程顯示不同的ICON，後來沒實現這部分功能
  const typeIcon = <FaMapMarkerAlt size={26} />
  // 修改中的顯示樣貌
  const displyEdit = (
    <div className="spotsbox-wrapper custom-box-shadow d-flex justify-content-between align-items-center">
      <span className="spotsbox-type">{typeIcon}</span>
      <span className="spotsbox-content">
        <input
          className={inputTimeClass}
          type="time"
          onChange={(e) => {
            dataFromUser[index[0]].data[index[1]].begin = e.target.value
            setDataFromUser(dataFromUser)
          }}
        />
        <input
          className={inputTitleClass}
          type="text"
          maxLength="12"
          onChange={(e) => {
            dataFromUser[index[0]].data[index[1]].title = e.target.value
            setDataFromUser(dataFromUser)
          }}
        />
      </span>
      {/* 刪除行程按鈕，功能從父元件傳入 */}
      <span
        className="box-close-btn"
        onClick={() => {
          doDelete()
        }}
      >
        <FaTimesCircle size={20} />
      </span>
    </div>
  )
  // 單純顯示資料時的樣貌
  const displyConst = (
    <div className="spotsbox-wrapper custom-box-shadow d-flex justify-content-between align-items-center">
      <span className="d-flex align-items-center">
        {typeIcon}
        &emsp; &emsp;
        <h3 className="d-inline">{begin}</h3>
      </span>
      <span className="w-100 text-center">
        <h4 className="d-inline">{title}</h4>
      </span>
    </div>
  )
  return isEdit ? displyEdit : displyConst
}

export default SpotsBox
// 檔案負責人: 柯政安
