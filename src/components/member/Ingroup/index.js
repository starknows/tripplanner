//正在參加的揪團
import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import './ingroup.scss'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

function MeFavoritesgroup({
  id = 1, //資料的id
  time1 = -1, //第一個日期
  time2 = -1, //第二個日期
  price = -1, //價格
}) {
  const [metbJoined, setMetbJoined] = useState([])
  let type = 'travelBuddies'
  if (time1 === -1) {
    type = 'travelBuddies'
  } else if (time2 !== -1) {
    type = 'travelBuddies'
    // 改
  } else if (price !== -1) {
    type = 'travelBuddies'
  }
  let detailUrl = `/${type}/view/${id}`
  async function gettbJoined() {
    try {
      const response = await fetch(
        `http://localhost:5000/travelBuddies/${id}`,
        {
          method: 'get',
        }
      )
      if (response.ok) {
        const data = await response.json()
        setMetbJoined(data)
      }
    } catch (err) {
      alert('無法得到伺服器資料，請稍後再重試')
      console.log(err)
    }
  }

  useEffect(() => {
    gettbJoined()
  }, [])

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  //display 顯示&&隱藏
  function mefdelet() {
    const listBtn = document.getElementById('show-card')
    const textlistn = document.getElementById('card-ingroup-box')
    listBtn.addEventListener('click', (e) => {
      textlistn.style.display = textlistn.style.display === 'none' ? '' : 'none'
    })
  }

  return (
    <>
      {metbJoined.map((e, index) => (
        <div
          key={index}
          id="card-ingroup-box"
          className="card-ingroup-box mb-3"
        >
          <div className="row no-gutters me-favorites-back-style">
            <div className="col-md-4">
              <Link to={detailUrl}>
                <img
                  src={
                    'http://localhost:5000/images/tbPhoto/' + e.tb_themePhoto
                  }
                  className="card-img img-fluid"
                  alt={e.tb_themePhoto}
                />
              </Link>
            </div>
            <div className="col-md-8 align-items-end">
              <div className="card-body">
                <h3 className="card-title">{e.tb_themeName}</h3>
                <span className="mef-icno-style">
                  <IoMdTime />{' '}
                  {metbJoined[0].tb_dateBegin.slice(0, 4) +
                    '/' +
                    metbJoined[0].tb_dateBegin.slice(5, 7) +
                    '/' +
                    metbJoined[0].tb_dateBegin.slice(8, 10) +
                    '-' +
                    metbJoined[0].tb_dateEnd.slice(0, 4) +
                    '/' +
                    metbJoined[0].tb_dateEnd.slice(5, 7) +
                    '/' +
                    metbJoined[0].tb_dateEnd.slice(8, 10)}
                </span>
                <span className="mef-icno-style d-flex justify-content-between">
                  {/* 地圖位置1 */}
                  <p className="card-style-mef ">
                    <FaMapMarkerAlt />
                    {e.tb_region}
                  </p>
                  <p className="card-style-mef mef-icon-map-move">
                    <FaMapMarkerAlt />
                    {e.tb_city}
                  </p>
                  <button id="Ingroup-btn" className="Ingroup-btn">
                    聊天室
                  </button>
                  <button
                    variant="primary"
                    className="Ingroup-btn"
                    onClick={handleShow}
                  >
                    取消
                  </button>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    keyboard={false}
                    onClick={mefdelet}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>請再次確認</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>是否刪除此揪團?</Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleClose} variant="secondary">
                        否
                      </Button>
                      <Button
                        id="show-card"
                        variant="primary"
                        type="sumbit"
                        onChange={mefdelet}
                        onClick={() => {
                          handleClose()
                        }}
                      >
                        送出
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </span>
                <br />
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <div id="show-card " style={{ display: 'none' }} onChange={mefdelet}>
        <NoData />
        <h2 className="center">尚未加入揪團</h2>
      </div> */}
    </>
  )
}

export default MeFavoritesgroup
