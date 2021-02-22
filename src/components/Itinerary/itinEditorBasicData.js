/**
 * 檔案負責人: 柯政安
 * 行程表基本資料元件
 * 使用在已公開發表或正準備發表的行程內，標示作者、發表時間與愛心、觀看數以及整體的簡介等等
 * 從組合的page直接取得行程資料，單純只用來顯示資料不做其他處理
 */
import React from 'react'
import {
  FaMapMarkerAlt,
  FaRegCalendarCheck,
  FaRegClock,
  FaEye,
} from 'react-icons/fa'
function ItinEditorBasicData({ itinData, isEdit = false, isPublish }) {
  //將從資料庫取得的時間(純數字字串)重新轉換成設計稿的斜線分隔格式
  let timeAll
  let timeClock
  if (isPublish) {
    timeAll = Array.from(itinData.publish_time.substr(0, 8))
    timeAll.splice(6, 0, '/')
    timeAll.splice(4, 0, '/')
    timeClock = Array.from(itinData.publish_time.substr(8))
    timeClock.splice(2, 0, ':')
  }
  //因為「準備發表」與「已發表」都使用此元件顯示資料，故將發表後才會有的發表時間、觀看人數切出來判斷非編輯中才會顯示
  const headData = (
    <div className="itin-basic-headdata d-flex justify-content-between align-items-center w-100 my-1">
      <span>
        <FaRegCalendarCheck />
        &emsp;
        {timeAll}
      </span>
      <span>
        <FaRegClock />
        &emsp;
        {timeClock}
      </span>
      <span>
        <FaEye />
        &emsp;
        {itinData.view}
      </span>
    </div>
  )
  return (
    <div className="itin-BasicData-wapper custom-box-shadow">
      <div className="itin-BasicData-head d-flex justify-content-between">
        <figure className="itin-BasicData-avatar">
          <img
            src={`http://localhost:5000/images/member/${itinData.member_photo_id}`}
            alt={itinData.member_name}
          />
        </figure>
        <div className="w-100 d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-between align-items-center w-100 my-1">
            <h4 className="itin-BasicData-member">{itinData.member_name}</h4>
            <div className="itin-BasicData-area">
              <p className="itin-BasicData-label content-small">
                <FaMapMarkerAlt />
                <span> {itinData.region}</span>
              </p>
              <p className="itin-BasicData-label content-small">
                <FaMapMarkerAlt />
                <span> {itinData.location}</span>
              </p>
            </div>
          </div>
          {/* 判斷非編輯狀態才會顯示數值 */}
          {!isEdit && headData}
        </div>
      </div>
      <hr />
      {/* 編輯中才會有文字輸入框，否則直接顯示行程簡介 */}
      {isEdit ? (
        <textarea
          className="itin-basicdata-text"
          placeholder="行程簡介"
          // 修改時也會先將舊資料寫入
          defaultValue={itinData.info}
        />
      ) : (
        <p>{itinData.info}</p>
      )}
    </div>
  )
}

export default ItinEditorBasicData
// 檔案負責人: 柯政安
