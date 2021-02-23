import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function TBMineButtonDelete(props) {
  const [tbMineDelete, settbMineDelete] = useState(false)
  // const [tbDelete, settbDelete] = useState([])
  let tb_id = props.id

  const [tbMine, settbMine] = useState([])
  const [tbSelect, settbSelect] = useState([])

  async function tbDoDelete() {
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        `http://localhost:5000/travelbuddies/${tb_id}`,
        {
          method: 'delete',
        }
      )

      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        props.gettbMine()
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
        className="tbmine-button-delete"
        onClick={() => settbMineDelete(true)}
      >
        刪除
      </Button>{' '}
      <Modal
        size="lg"
        show={tbMineDelete}
        onHide={() => settbMineDelete(false)}
        aria-labelledby="tbMineDelete"
        centered={true}
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="tbMineDelete" className="tbmine-delete-title">
              您確定要刪除<span>{' ' + props.tb_themeName_ + ' '}</span>
              並通知團員嗎？
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="tbMineDeleteMessage">
              <Form.Label htmlFor="tbMineDeleteMessage">通知訊息：</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="tbmine-button-delete-cancel">
              取消
            </Button>
            <Button
              variant=""
              className="tbmine-button-delete-confirm"
              onClick={() => {
                tbDoDelete()
                settbMineDelete(false)
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

export default TBMineButtonDelete
