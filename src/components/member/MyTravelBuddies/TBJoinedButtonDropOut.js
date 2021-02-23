import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function TBJoinedButtonDropOut(props) {
  const [tbJoinedDropOut, settbJoinedDropOut] = useState(false)
  let tb_id = props.id
  let tb_themeName = props.themeName

  const [tbMine, settbMine] = useState([])
  const [tbSelect, settbSelect] = useState([])

  async function tbDoDropOut() {
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        `http://localhost:5000/travelbuddies/tbjoined/${tb_id}`,
        {
          method: 'delete',
        }
      )

      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        props.gettbJoined()
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試-delete的問題')
      console.log(error)
    }
  }
  return (
    <>
      <Button
        className="tbjoined-button-dropout"
        onClick={() => settbJoinedDropOut(true)}
      >
        取消報名
      </Button>{' '}
      <Modal
        size="lg"
        show={tbJoinedDropOut}
        onHide={() => settbJoinedDropOut(false)}
        aria-labelledby="tbJoinedDrop"
        centered={true}
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="tbJoinedDrop" className="tbmine-delete-title">
              您確定要退出<span>{' ' + tb_themeName + ' '}</span>並通知團員嗎？
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="tbMineDeleteMessage">
              <Form.Label htmlFor="tbMineDeleteMessage">通知訊息：</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="tbjoined-button-dropout-cancel">
              取消
            </Button>
            <Button
              variant=""
              className="tbjoined-button-dropout-confirm"
              onClick={() => {
                tbDoDropOut()
                settbJoinedDropOut(false)
              }}
              type="button"
            >
              確定
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default TBJoinedButtonDropOut
