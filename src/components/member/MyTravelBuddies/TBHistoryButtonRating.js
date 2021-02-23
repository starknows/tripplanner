import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

function TBHistoryButtonRating(props) {
  const [tbHistoryButtonRating, settbHistoryButtonRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [ratingData, setRatingData] = useState(0)
  const [members, setMembers] = useState(0)
  console.log(rating)
  const [hover, setHover] = useState(0)
  const tb_id = props.id
  async function getMembers() {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/tbratingmembers/${tb_id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setMembers(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getMembers()
  }, [])
  async function getStarRating() {
    try {
      const response = await fetch(
        `http://localhost:5000/travelbuddies/tbrating/${tb_id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setRating(Math.round(data[0].rating))
        setRatingData(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }
  useEffect(() => {
    getStarRating()
  }, [])
  return (
    <>
      <Button
        className="tbhistory-button-rating"
        onClick={() => settbHistoryButtonRating(true)}
      >
        查看評價
      </Button>{' '}
      <Modal
        show={tbHistoryButtonRating}
        onHide={() => settbHistoryButtonRating(false)}
        aria-labelledby="tbHistoryButtonRating"
        centered={true}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title
              id="tbHistoryButtonRating"
              className="tbhistory-rating-title"
            >
              查看本次旅行揪團收到的評價
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="tb-check-star-rating">
              <h5>
                {ratingData.length && ratingData[0].member_giveRating}
                人已評價，
                {(members.length && members[0].member_count) -
                  (ratingData.length && ratingData[0].member_giveRating)}
                人尚未評價
              </h5>
              {[...Array(5)].map((star, index) => {
                index += 1
                return (
                  <button
                    type="button"
                    key={index}
                    className={
                      index <= (hover || rating) ? 'starOn' : 'starOff'
                    }
                  >
                    <span className="star">&#9733;</span>
                  </button>
                )
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="tbhistory-button-rating-close">
              關閉
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default TBHistoryButtonRating
