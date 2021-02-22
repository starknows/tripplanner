/**
 * 檔案負責人: 柯政安
 * 此元件用來將按鈕上傳圖片與點圖切換圖片兩種方式結合，提升使用者體驗
 * 原先打算製作成可重複使用的元件分享給組員，故className是由外部傳入
 * 但因時間因素最後未能達成目的，僅有我的頁面使用
 */

import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

function PicUploadRect({
  originPic = '',
  giveClassName = {
    input: 'inputClass',
    img: 'imgClass',
    wrap: 'wrapClass',
  },
}) {
  // 使用fileReader將使用者選擇的照片及時顯示在畫面上
  function handlePicChange(e, index) {
    let reader = new FileReader()
    let file = e.target.files[0]
    if (file) {
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        document.querySelector(`.${index}`).setAttribute('src', reader.result)
      }
    }
  }
  //設定顯示狀態判斷，若原本有照片則為true
  const [isDisplay, setIsDisplay] = useState(originPic && true)
  //若沒照片就顯示上傳按鈕
  const displayNone = (
    <div className="itin-readyToUpload d-flex justify-content-center align-items-center">
      <Button
        variant="light"
        // 按下按鈕觸發隱藏input執行
        onClick={(e) => {
          e.preventDefault()
          document.querySelector(`.${giveClassName.input}`).click()
        }}
      >
        選擇照片
      </Button>
    </div>
  )
  // 若有照片就顯示照片
  const displayImg = (
    <img
      // 按下圖片觸發隱藏input執行
      onClick={(e) => {
        e.preventDefault()
        document.querySelector(`.${giveClassName.input}`).click()
      }}
      className={giveClassName.img}
      src={`http://localhost:5000/images/${originPic}`}
      alt={`PicInfo`}
    />
  )
  return (
    <div className={giveClassName.wrap}>
      <input
        className={`itin-pic-input ${giveClassName.input}`}
        type="file"
        accept="image/*"
        onChange={(e) => {
          setIsDisplay(true)
          handlePicChange(e, giveClassName.img)
        }}
      />
      {isDisplay ? displayImg : displayNone}
    </div>
  )
}

export default PicUploadRect
