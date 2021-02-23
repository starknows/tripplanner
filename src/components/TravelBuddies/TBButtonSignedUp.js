import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

function TBButtonSignedUp(props) {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const user = userData.newsId
  const [tbButtonSignedUp, settbButtonSignedUp] = useState(false)
  const [tbButtonDropOut, settbButtonDropOut] = useState(false)
  const [signedUp, setSignedUp] = useState(0)
  let id = props.id

  const [signedUpAlready, setSignedUpAlready] = useState('')

  async function getSignedUp(props) {
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        `http://localhost:5000/travelbuddies/tbsignedupalready?tb_id=${id}&m_id=${user}`,
        {
          method: 'get',
        }
      )
      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        // console.log(data)
        // setSignedUpAlready(data)
        setSignedUp(data.length === 0 ? 0 : 1)
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(error)
    }
  }
  useEffect(() => {
    getSignedUp()
  }, [])

  async function membersSignedUp() {
    const newSignedUp = {
      id,
    }
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        'http://localhost:5000/travelbuddies/tbsignedup',
        {
          method: 'post',
          body: JSON.stringify(newSignedUp),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      )

      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        console.log(data)

        // 設定資料到member狀態
        if (data.id) console.log('報名成功')
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(error)
    }
  }
  async function membersDropOut() {
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        `http://localhost:5000/travelbuddies/tbdropout/${id}`,
        {
          method: 'delete',
        }
      )

      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        console.log(data)

        // 設定資料到member狀態
        if (data.id) console.log('報名成功')
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(error)
    }
  }
  return (
    <>
      {signedUp === 1 ? (
        <Button
          className="tb-mainpage-button"
          onClick={() => {
            membersDropOut()
            settbButtonDropOut(true)
            setSignedUp(0)
          }}
        >
          取消報名
        </Button>
      ) : (
        <Button
          className="tb-mainpage-button"
          onClick={() => {
            membersSignedUp()
            settbButtonSignedUp(true)
            setSignedUp(1)
          }}
        >
          報名
        </Button>
      )}
      <Modal
        show={tbButtonSignedUp}
        onHide={() => settbButtonSignedUp(false)}
        aria-labelledby="tbSignedUp"
        centered={true}
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="tbSignedUp" className="tbjoined-dropout-title">
              報名成功
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="tb-signedup-content">
              {'您已成功報名' + ' ' + props.themeName + ' ' + '！'}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="tbhistory-button-rating-close">
              關閉
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal
        show={tbButtonDropOut}
        onHide={() => settbButtonDropOut(false)}
        aria-labelledby="tbDropOut"
        centered={true}
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="tbDropOut" className="tbjoined-dropout-title">
              取消成功
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="tb-signedup-content">
              {'您已取消報名' + ' ' + props.themeName + ' ' + '！'}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="tbhistory-button-rating-close">
              關閉
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default TBButtonSignedUp
