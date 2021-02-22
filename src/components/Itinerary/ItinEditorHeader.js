/**
 *檔案負責人: 柯政安
 此元件負責處理畫面最上方標題與介面操作按鈕的顯示內容
 依照所傳入的是否編輯/是否發表參數來決定樣貌
 */
import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom'
import BasicFetch from '../main/BasicFetch'

function ItinEditorHeader({
  isEdit = false,
  isPublish = false,
  isMe = false,
  title = '行程表',
  setTitle,
  handleSubmit,
}) {
  let history = useHistory()
  let { itin_id } = useParams()
  // 發表或修改已發表內容時的顯示內容
  // 內部又分為修改中或檢視中，完全依照指定之狀態顯示
  const displayPublish = (
    <div className="itin-editor-title publish-title d-flex justify-content-between">
      <div>
        {isEdit && <h2>發表我的行程表</h2>}
        <h1>{title}</h1>
      </div>
      {isEdit && (
        <div className="d-flex align-items-center">
          <Button
            variant="info"
            onClick={() => {
              // 執行的程式由父元件傳入
              handleSubmit()
            }}
          >
            送出
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              // 按下取消直接回上頁
              history.goBack()
            }}
          >
            取消
          </Button>
        </div>
      )}
      {/* 僅有發文者檢視時會出現修改按鈕 */}
      {isMe && !isEdit && (
        <div className="d-flex align-items-center">
          <Button
            variant="info"
            onClick={() => {
              history.push(`/itinerary/publish/${itin_id}`)
            }}
          >
            修改
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (
                // 自製簡易fetch元件，用於僅需回傳true/false的單純情況
                // 此處僅用來修改行程的發表與否，因此只需要確定是否成功
                BasicFetch({
                  url: `itinerary/unpublish/${itin_id}`,
                  method: 'put',
                  data: { id: itin_id },
                })
              ) {
                history.push(`/itinerary/my/${itin_id}`)
              }
            }}
          >
            取消發布
          </Button>
        </div>
      )}
    </div>
  )
  // 未發表的私人行程，設計樣式與已發表完全不同
  // 內部同樣分為修改中或檢視中，完全依照指定之狀態顯示
  const displayPrivate = (
    <div className="itin-editor-title custom-box-shadow">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {isEdit ? <p>行程表製作</p> : <p>我的行程表</p>}
        {isEdit ? (
          <span>
            <Button
              variant="info"
              onClick={() => {
                handleSubmit()
              }}
            >
              送出
            </Button>
            <Button
              variant="danger"
              onClick={(e) => {
                history.goBack()
              }}
            >
              取消
            </Button>
          </span>
        ) : (
          <div className="d-flex align-items-center justify-content-between">
            <span>
              <Button
                variant="info"
                onClick={() => {
                  history.push(`/itinerary/edit/${itin_id}`)
                }}
              >
                修改
              </Button>
              <Button
                variant="info"
                onClick={() => {
                  history.push(`/itinerary/publish/${itin_id}`)
                }}
              >
                發布
              </Button>
            </span>
          </div>
        )}
      </div>
      {isEdit ? (
        <input
          className="form-custom itin-title-input"
          type="text"
          placeholder="請輸入行程標題"
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
      ) : (
        <h2>{title}</h2>
      )}
    </div>
  )
  return <>{isPublish ? displayPublish : displayPrivate}</>
}

export default ItinEditorHeader
