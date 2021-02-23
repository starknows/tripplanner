import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { Button, Modal, Form } from 'react-bootstrap'

function TBButtonGiveStar(props) {
  let history = useHistory()
  const member_id = JSON.parse(localStorage.getItem('userData')).newsId
  let memberName = props.memberName
  const [tbGiveStar, settbGiveStar] = useState(false)
  const [doGiveStar, setDoGiveStart] = useState(0)
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const tb_id = props.tb_id
  const m_id = props.m_id
  const give_id = JSON.parse(localStorage.getItem('userData')).newsId
  const [memberAlready, setMemberAlready] = useState('')

  async function getStarRating(props) {
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        `http://localhost:5000/travelbuddies/tbratingalready?tb_id=${tb_id}&m_id=${m_id}&give_id=${give_id}`,
        {
          method: 'get',
        }
      )
      // ok只能判斷201-299狀態碼的情況
      if (response.ok) {
        // 剖析資料為JS的數值
        const data = await response.json()
        // setMemberAlready(data)
        // console.log(memberAlready)
        setDoGiveStart(data.length === 0 ? 0 : 1)
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(error)
    }
  }
  useEffect(() => {
    getStarRating()
  }, [])

  async function giveStarRating(props) {
    const newSignedUp = {
      tb_id,
      m_id,
      rating,
      give_id,
    }
    // 要使用try-catch來作錯誤處理
    try {
      // 從伺服器得到資料
      const response = await fetch(
        'http://localhost:5000/travelbuddies/tbrating/',
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
        // props.getTBMembers()
      }
    } catch (error) {
      // 發生錯誤的處理情況
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(error)
    }
  }
  return (
    <>
      {member_id === m_id ? (
        <Button className="tb-give-star-mine">本人</Button>
      ) : doGiveStar === 0 ? (
        <Button className="tb-give-star" onClick={() => settbGiveStar(true)}>
          評價
        </Button>
      ) : (
        <Button className="tb-give-star">已評價</Button>
      )}
      <Modal
        show={tbGiveStar}
        onHide={() => settbGiveStar(false)}
        aria-labelledby="tbGiveStar"
        centered={true}
      >
        <div>
          <Modal.Header closeButton>
            <Modal.Title id="tbGiveStar" className="tbmine-delete-title">
              評價團員
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="star-rating-outbox">
              <div className="star-rating-name">{memberName}</div>
              {/* <div>{memberAlready > 0 && memberAlready[1].member_already}</div> */}
              <br />
              <div>
                {[...Array(5)].map((star, index) => {
                  index += 1
                  return (
                    <button
                      type="button"
                      key={index}
                      className={
                        index <= (hover || rating) ? 'starOn' : 'starOff'
                      }
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
                    >
                      <span className="star">&#9733;</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="tbmine-button-delete-cancel">
              取消
            </Button>
            <Button
              variant=""
              className="tbmine-button-delete-confirm"
              onClick={() => {
                setDoGiveStart(1)
                giveStarRating()
                settbGiveStar(false)
              }}
              type="submit"
            >
              確定
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  )
}

export default TBButtonGiveStar
