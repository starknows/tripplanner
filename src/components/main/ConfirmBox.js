/**
 * 檔案負責人: 柯政安
 * 此元件用來實作confirm效果，被我使用在刪除功能的二次確認
 * 利用React bootstap的蓋版modal延伸製作
 * 在父元件執行特定程式前跳出modal視窗，並將特定程式傳入modal元件
 * 在modal元件中按下確認後才真正執行該特定程式，達到confirm效果
 * 可傳入callback以及該callback所需的參數
 */

import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function ConfirmBox(props) {
  const {
    cb = () => alert('ok'),
    cbprops,
    header = '請再次確認',
    subHeader = '',
    text = '是否進行此操作',
    resetdom,
    ...rest
  } = props
  return (
    <Modal
      {...rest}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        {/* 外部傳入的確認視窗標題 */}
        <Modal.Title id="contained-modal-title-vcenter">{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* 外部傳入的確認視窗文字 */}
        <h4>{subHeader}</h4>
        <p>{text}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          // 按下送出以後，父元件的modal會因為執行resetdom而回歸初始狀態
          onClick={() => {
            resetdom(<></>)
            rest.onHide(false)
            cb(...cbprops)
          }}
        >
          送出
        </Button>
        <Button
          onClick={() => {
            resetdom(<></>)
            rest.onHide(false)
          }}
        >
          取消
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmBox
