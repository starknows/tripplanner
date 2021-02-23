/**
 * 檔案負責人: 柯政安
 * 行程表詳細資料元件
 * 出現在已公開發表的行程頁右手邊
 * 讓使用者藉由點選左側的行程box，以js與css切換該行程的詳細資料顯示狀態
 */
import React from 'react'
import DisplayMap from './DisplayMap'
//測試用假資料
import fakeTestingData from './testBoxData'
import PicUploadRect from './PicUploadRect'
//
function ItinEditorDetail({ isEdit = true, boxData = fakeTestingData }) {
  //編輯中的顯示樣貌
  //此時可讓使用者針對不同行程加入圖片與簡介文字
  const displayEdit = (
    <div className="itin-detail-wrapper custom-box-shadow">
      <div className="itin-map-header"></div>
      <div className="itin-detail-map-wrapper">
        {/* 使用自製地圖元件顯示該行程所有景點的marker，並定位在第一個行程的經緯度 */}
        <DisplayMap
          boxData={boxData}
          center={{
            lat: Number(boxData[0].data[0].lat),
            lng: Number(boxData[0].data[0].lng),
          }}
        />
      </div>
      <hr />
      {/* 利用給予的資料先製作出基本UI並產生符合行程數量的空欄位 */}
      {boxData.map((element, index) => (
        <h4 className={`dayTitle${index}`} key={index}>
          {element.title}
        </h4>
      ))}
      <form id="detailForm" method="post">
        {boxData.map((element, indexDay) => (
          <div key={indexDay}>
            {element.data.map((ele, indexBox) => {
              let nomalClass = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox}`
              let defaultCheck = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox} itin-detailPicText-show`
              return (
                <div
                  className={
                    indexDay === 0 && indexBox === 0 ? defaultCheck : nomalClass
                  }
                  key={indexBox}
                >
                  <p>{ele.title}</p>
                  <div className="itin-detail-checkKV">
                    {indexDay === 0 && indexBox === 0 ? (
                      <input
                        defaultChecked
                        type="radio"
                        name="itin-kv"
                        value={`${indexDay}${indexBox}`}
                      />
                    ) : (
                      <input
                        type="radio"
                        name="itin-kv"
                        value={`${indexDay}${indexBox}`}
                      />
                    )}
                    設為主視覺
                  </div>
                  {/* 自製照片上傳介面元件，可用來切換上傳按鈕與點圖片換圖兩種模式 */}
                  {/* 原先想製作成可重複利用的元件，因此將className改為外部提供模式 */}
                  {/* 後來因時間不及而成為半成品，僅限此處可用 */}
                  <PicUploadRect
                    originPic={ele.image}
                    giveClassName={{
                      input: `itin-input-${indexDay}${indexBox}`,
                      img: `PicInfo${indexDay}${indexBox}`,
                      wrap: 'detailPic',
                    }}
                  />
                  <textarea
                    className={`textarea-${indexDay}${indexBox}`}
                    placeholder="您可以在此輸入心得或描述"
                    defaultValue={ele.info}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </form>
    </div>
  )
  //單純顯示資料的樣貌
  //此時無法編輯，只能查看
  const displayConst = (
    <div className="itin-detail-wrapper custom-box-shadow">
      <div className="itin-map-header"></div>
      <div className="itin-detail-map-wrapper">
        {/* 使用自製地圖元件顯示該行程所有景點的marker，並定位在第一個行程的經緯度 */}
        <DisplayMap
          boxData={boxData}
          center={{
            lat: Number(boxData[0].data[0].lat),
            lng: Number(boxData[0].data[0].lng),
          }}
        />
      </div>
      <hr />
      {boxData.map((element, index) => (
        <h4 className={`dayTitle${index}`} key={index}>
          {element.title}
        </h4>
      ))}
      <form id="detailForm">
        {boxData.map((element, indexDay) => (
          <div key={indexDay}>
            {element.data.map((ele, indexBox) => {
              let nomalClass = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox}`
              let defaultCheck = `itin-detail-pictext-wrapper boxInfo${indexDay}${indexBox} itin-detailPicText-show`
              return (
                <div
                  className={
                    indexDay === 0 && indexBox === 0 ? defaultCheck : nomalClass
                  }
                  key={indexBox}
                >
                  <p>{ele.title}</p>
                  {ele.image === '' || ele.image === null ? (
                    <></>
                  ) : (
                    <div className="detailPic">
                      <img
                        src={`http://localhost:5000/images/${ele.image}`}
                        alt={ele.title}
                      />
                    </div>
                  )}
                  <div className="showInfoText">
                    <p>{ele.info}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </form>
    </div>
  )
  return isEdit ? displayEdit : displayConst
}

export default ItinEditorDetail
